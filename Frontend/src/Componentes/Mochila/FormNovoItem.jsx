import React, { useState } from "react";

const FormNovoItem = ({ mochilaId, recarregar }) => {
  const [item, setItem] = useState({ nome: "", descricao: "", quantidade: 1 });

  const adicionar = async () => {
    if (!item.nome) return alert("Nome é obrigatório");
    const res = await fetch("http://localhost:8080/mochilaItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, mochila: { id: mochilaId } }),
    });
    if (res.ok) {
      alert("Item adicionado");
      setItem({ nome: "", descricao: "", quantidade: 1 });
      recarregar();
    } else {
      alert("Erro ao adicionar");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        placeholder="Nome"
        value={item.nome}
        onChange={(e) => setItem({ ...item, nome: e.target.value })}
      />
      <input
        placeholder="Descrição"
        value={item.descricao}
        onChange={(e) => setItem({ ...item, descricao: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={item.quantidade}
        onChange={(e) => setItem({ ...item, quantidade: e.target.value })}
      />
      <button onClick={adicionar}>Adicionar Item</button>
    </div>
  );
};

export default FormNovoItem;
