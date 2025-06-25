import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import "./Despesas.css";

const Despesas = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [despesasPorViagem, setDespesasPorViagem] = useState({});
  const [novaDespesa, setNovaDespesa] = useState({ nome: "", quantidade: "", preco: "" });
  const [viagemAbertaId, setViagemAbertaId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => setViagens(data))
      .catch((err) => console.error("Erro ao carregar viagens:", err));
  }, [usuario]);

  const carregarDespesas = (viagemId) => {
    fetch(`http://localhost:8080/despesa/${viagemId}`)
      .then((res) => res.json())
      .then((data) =>
        setDespesasPorViagem((prev) => ({
          ...prev,
          [viagemId]: data,
        }))
      )
      .catch((err) => console.error("Erro ao carregar despesas:", err));
  };

  const adicionarDespesa = async (viagemId) => {
    const despesaDTO = {
      nome: novaDespesa.nome,
      quantidade: Number(novaDespesa.quantidade),
      preco: Number(novaDespesa.preco),
      viagemId: viagemId,
    };

    const res = await fetch("http://localhost:8080/despesa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(despesaDTO),
    });

    if (res.ok) {
      setNovaDespesa({ nome: "", quantidade: "", preco: "" });
      carregarDespesas(viagemId);
    } else {
      const erro = await res.text();
      alert("Erro ao adicionar despesa: " + erro);
    }
  };
const excluirDespesa = async (despesaId, viagemId) => {
  const confirmar = window.confirm("Deseja realmente excluir esta despesa?");
  if (!confirmar) return;

  const res = await fetch(`http://localhost:8080/despesa/${despesaId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    try {
      const resDespesas = await fetch(`http://localhost:8080/despesa/${viagemId}`);

      if (!resDespesas.ok) {
        throw new Error("Erro ao buscar despesas após exclusão");
      }

      // Verifica se há conteúdo
      const texto = await resDespesas.text();
      const data = texto ? JSON.parse(texto) : [];

      setDespesasPorViagem((prev) => ({
        ...prev,
        [viagemId]: data,
      }));

      if (data.length === 0) {
        setViagemAbertaId(null);
      }
    } catch (err) {
      console.error("Erro ao atualizar despesas após exclusão:", err);
    }
  } else {
    const erro = await res.text();
    alert("Erro ao excluir despesa: " + erro);
  }
};

  return (
    <div>
      <Menu />
      <h2>Despesas por Viagem</h2>
      {viagens.map((viagem) => (
        <div key={viagem.id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
          <h3
            onClick={() => {
              if (viagemAbertaId === viagem.id) {
                setViagemAbertaId(null);
              } else {
                setViagemAbertaId(viagem.id);
                carregarDespesas(viagem.id);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {viagem.titulo}
          </h3>

          {viagemAbertaId === viagem.id && (
            <div>
              <ul>
                {despesasPorViagem[viagem.id]?.map((despesa) => (
                  <li key={despesa.id}>
                    <strong>{despesa.nome}</strong> - Qtd: {despesa.quantidade} - R$ {despesa.preco}
                    <button
                      onClick={() => excluirDespesa(despesa.id, viagem.id)}
                      style={{ marginLeft: "1rem", color: "white", backgroundColor: "red", border: "none", padding: "0.3rem 0.5rem", borderRadius: "4px" }}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>

              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={novaDespesa.nome}
                  onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={novaDespesa.quantidade}
                  onChange={(e) => setNovaDespesa({ ...novaDespesa, quantidade: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Preço"
                  value={novaDespesa.preco}
                  onChange={(e) => setNovaDespesa({ ...novaDespesa, preco: e.target.value })}
                />
                <button onClick={() => adicionarDespesa(viagem.id)}>Adicionar Despesa</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Despesas;
