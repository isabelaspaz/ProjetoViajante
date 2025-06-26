import React, { useState } from "react";
import FormNovaMochila from "./FormNovaMochila";
import MochilaCard from "./MochilaCard";

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
      {mochilas.map((mochila) => (
        <MochilaCard
          key={mochila.id}
          mochila={mochila}
          recarregar={recarregarMochilas}
        />
      ))}
    </div>
  );
};

export default MochilaLista;
