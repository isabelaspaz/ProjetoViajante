import React from "react";
import CardViagem from "./CardViagem";

const ListaViagens = ({
  viagens,
  viagemAbertaId,
  setViagemAbertaId,
  carregarDespesas,
  despesasPorViagem,
  novaDespesa,
  setNovaDespesa,
  adicionarDespesa,
  excluirDespesa,
}) => (
  <>
    {viagens.map((viagem) => (
      <CardViagem
        key={viagem.id}
        viagem={viagem}
        isAberta={viagemAbertaId === viagem.id}
        setAberta={setViagemAbertaId}
        carregarDespesas={carregarDespesas}
        despesas={despesasPorViagem[viagem.id] || []}
        novaDespesa={novaDespesa}
        setNovaDespesa={setNovaDespesa}
        adicionarDespesa={adicionarDespesa}
        excluirDespesa={excluirDespesa}
      />
    ))}
  </>
);

export default ListaViagens;
