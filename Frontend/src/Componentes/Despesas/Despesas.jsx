import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import ListaViagens from "./ListaViagens";

const Despesas = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [selectedViagem, setSelectedViagem] = useState(null);
  const [despesasPorViagem, setDespesasPorViagem] = useState({});
  const [novaDespesa, setNovaDespesa] = useState({ nome: "", quantidade: "", preco: "" });

  useEffect(() => {
    fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar viagens");
        const text = await res.text();
        return text ? JSON.parse(text) : [];
      })
      .then(setViagens)
      .catch((e) => console.error(e));
  }, [usuario]);

  const carregarDespesas = async (viagemId) => {
    try {
      const res = await fetch(`http://localhost:8080/despesa/${viagemId}`);
      if (!res.ok) throw new Error("Erro ao buscar despesas");
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setDespesasPorViagem((prev) => ({ ...prev, [viagemId]: data }));
    } catch (e) {
      console.error(e);
      setDespesasPorViagem((prev) => ({ ...prev, [viagemId]: [] }));
    }
  };

  const toggleViagem = (viagemId) => {
    if (selectedViagem === viagemId) {
      setSelectedViagem(null);
    } else {
      setSelectedViagem(viagemId);
      carregarDespesas(viagemId);
    }
  };

  const adicionarDespesa = async (viagemId) => {
    const dto = {
      ...novaDespesa,
      quantidade: Number(novaDespesa.quantidade),
      preco: Number(novaDespesa.preco),
      viagemId,
    };
    try {
      const res = await fetch("http://localhost:8080/despesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (res.ok) {
        setNovaDespesa({ nome: "", quantidade: "", preco: "" });
        carregarDespesas(viagemId);
      } else {
        console.error("Erro ao adicionar despesa");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const excluirDespesa = async (despesaId, viagemId) => {
    try {
      const res = await fetch(`http://localhost:8080/despesa/${despesaId}`, {
        method: "DELETE",
      });
      if (res.ok) carregarDespesas(viagemId);
      else console.error("Erro ao excluir despesa");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Menu />
      <h2>Despesas por Viagem</h2>
      <ListaViagens
        viagens={viagens}
        viagemAbertaId={selectedViagem}
        setViagemAbertaId={toggleViagem}
        carregarDespesas={carregarDespesas}
        despesasPorViagem={despesasPorViagem}
        novaDespesa={novaDespesa}
        setNovaDespesa={setNovaDespesa}
        adicionarDespesa={adicionarDespesa}
        excluirDespesa={excluirDespesa}
      />
    </div>
  );
};

export default Despesas;
