import React, { useState } from "react";
import FormNovaMochila from "./FormNovaMochila";
import ItemLista from "./ItemLista";
import FormNovoItem from "./FormNovoItem";
import "./Mochila.css";

const MochilaLista = ({ mochilas, viagemId, recarregarMochilas }) => {
  const [novaMochila, setNovaMochila] = useState({ titulo: "", pesoTotalAprox: 0 });

  return (
    <div>
      <h2>Mochilas da Viagem</h2>
      {mochilas.length === 0 && <p>Nenhuma mochila cadastrada ainda.</p>}

      <FormNovaMochila
        novaMochila={novaMochila}
        setNovaMochila={setNovaMochila}
        viagemId={viagemId}
        recarregar={recarregarMochilas}
      />

      <div className="mochilas-grid">
        {mochilas.map((mochila) => (
          <div className="mochila-coluna" key={mochila.id}>
            <h3>{mochila.titulo}</h3>
            <p>Peso Total: {mochila.pesoTotalAprox}kg</p>
            <h4>Itens:</h4>
            <ItemLista itens={mochila.mochilaItens} recarregar={recarregarMochilas} />
            <FormNovoItem mochilaId={mochila.id} recarregar={recarregarMochilas} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MochilaLista;
