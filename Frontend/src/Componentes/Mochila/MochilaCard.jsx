import React, { useState } from "react";
import ItemLista from "./ItemLista";
import FormNovoItem from "./FormNovoItem";

const MochilaCard = ({ mochila, recarregar }) => {
  const [editando, setEditando] = useState(null);

  const handleSalvar = async () => {
    if (!editando.titulo) return alert("Título obrigatório");
    const res = await fetch(`http://localhost:8080/mochila/att/${mochila.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editando),
    });
    if (res.ok) {
      alert("Mochila atualizada");
      setEditando(null);
      recarregar();
    } else {
      alert("Erro ao atualizar");
    }
  };

  const handleExcluir = async () => {
    const res = await fetch(`http://localhost:8080/mochila/${mochila.id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Mochila excluída");
      recarregar();
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
      <h3>
        {editando ? (
          <input
            type="text"
            value={editando.titulo}
            onChange={(e) => setEditando({ ...editando, titulo: e.target.value })}
          />
        ) : (
          mochila.titulo
        )}
      </h3>
      <p>
        Peso Total:{" "}
        {editando ? (
          <input
            type="number"
            value={editando.pesoTotalAprox}
            onChange={(e) => setEditando({ ...editando, pesoTotalAprox: e.target.value })}
          />
        ) : (
          `${mochila.pesoTotalAprox}kg`
        )}
      </p>
      {editando ? (
        <button onClick={handleSalvar}>Salvar</button>
      ) : (
        <button onClick={() => setEditando(mochila)}>Editar</button>
      )}
      <button onClick={handleExcluir}>Excluir</button>

      <h4>Itens:</h4>
      <ItemLista itens={mochila.mochilaItens} recarregar={recarregar} />
      <FormNovoItem mochilaId={mochila.id} recarregar={recarregar} />
    </div>
  );
};

export default MochilaCard;
