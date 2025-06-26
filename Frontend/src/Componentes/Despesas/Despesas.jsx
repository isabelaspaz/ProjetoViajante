import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import ListaViagens from "./ListaViagens";
import "./Despesas.css";

const Despesas = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [selectedViagem, setSelectedViagem] = useState(null);
  const [despesasPorViagem, setDespesasPorViagem] = useState({});
  const [novaDespesa, setNovaDespesa] = useState({ nome: "", quantidade: "", preco: "" });

  useEffect(() => {
    fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`)
      .then((res) => res.json())
      .then(setViagens);
  }, [usuario]);

  const toggleViagem = async (viagemId) => {
    if (selectedViagem === viagemId) {
      setSelectedViagem(null);
    } else {
      setSelectedViagem(viagemId);
      const res = await fetch(`http://localhost:8080/despesa/${viagemId}`);
      const data = await res.json();
      setDespesasPorViagem((prev) => ({ ...prev, [viagemId]: data }));
    }
  };

  const adicionarDespesa = async (viagemId) => {
    const dto = { ...novaDespesa, quantidade: Number(novaDespesa.quantidade), preco: Number(novaDespesa.preco), viagemId };
    const res = await fetch("http://localhost:8080/despesa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    if (res.ok) {
      setNovaDespesa({ nome: "", quantidade: "", preco: "" });
      toggleViagem(viagemId);
    }
  };

  const excluirDespesa = async (despesaId, viagemId) => {
    const res = await fetch(`http://localhost:8080/despesa/${despesaId}`, { method: "DELETE" });
    if (res.ok) toggleViagem(viagemId);
  };

  return (
    <div>
      <Menu />
      <h2>Despesas por Viagem</h2>
      <ViagemLista viagens={viagens} selectedViagemId={selectedViagem} onToggle={toggleViagem} />
      {selectedViagem && (
        <>
          <ListaDespesas despesas={despesasPorViagem[selectedViagem] || []} onExcluir={(id) => excluirDespesa(id, selectedViagem)} />
          <FormDespesa
            novaDespesa={novaDespesa}
            setNovaDespesa={setNovaDespesa}
            onAdicionar={() => adicionarDespesa(selectedViagem)}
          />
        </>
      )}
    </div>
  );
};

export default Despesas;