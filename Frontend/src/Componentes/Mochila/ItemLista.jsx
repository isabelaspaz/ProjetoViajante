import React, { useState } from "react";

const ItemLista = ({ itens = [], recarregar }) => {
  const [editando, setEditando] = useState(null);

  const salvar = async () => {
    if (!editando.nome || !editando.descricao || editando.quantidade == null) {
      return alert("Campos obrigatórios");
    }
    const res = await fetch(`http://localhost:8080/mochilaItem/att/${editando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editando),
    });
    if (res.ok) {
      alert("Item atualizado");
      setEditando(null);
      recarregar();
    }
  };

  const excluir = async (id) => {
    const res = await fetch(`http://localhost:8080/mochilaItem/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Item removido");
      recarregar();
    }
  };

  return (
    <>
      {itens.map((item) => (
        <div key={item.id} style={{ paddingLeft: "20px" }}>
          {editando?.id === item.id ? (
            <>
              <input
                value={editando.nome}
                onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
              />
              <input
                value={editando.descricao}
                onChange={(e) => setEditando({ ...editando, descricao: e.target.value })}
              />
              <input
                type="number"
                value={editando.quantidade}
                onChange={(e) => setEditando({ ...editando, quantidade: e.target.value })}
              />
              <button onClick={salvar}>Salvar</button>
            </>
          ) : (
            <>
              <strong>{item.nome}</strong> - {item.descricao} (x{item.quantidade})
              <button onClick={() => setEditando(item)} style={{ marginLeft: "10px" }}>
                Editar
              </button>
            </>
          )}
          <button onClick={() => excluir(item.id)}>Remover</button>
        </div>
      ))}
    </>
  );
};

export default ItemLista;
