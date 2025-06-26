import React from "react";
import ListaDespesas from "./ListaDespesas";
import FormDespesa from "./FormDespesa";

const CardViagem = ({
  viagem,
  isAberta,
  setAberta,
  carregarDespesas,
  despesas,
  novaDespesa,
  setNovaDespesa,
  adicionarDespesa,
  excluirDespesa,
}) => {
  const toggle = () => {
    setAberta(isAberta ? null : viagem.id);
    if (!isAberta) carregarDespesas(viagem.id);
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
      <h3 onClick={toggle} style={{ cursor: "pointer" }}>{viagem.titulo}</h3>
      {isAberta && (
        <>
          <ListaDespesas despesas={despesas} onExcluir={(id) => excluirDespesa(id, viagem.id)} />
          <FormDespesa
            novaDespesa={novaDespesa}
            setNovaDespesa={setNovaDespesa}
            onAdicionar={() => adicionarDespesa(viagem.id)}
          />
        </>
      )}
    </div>
  );
};

export default CardViagem;