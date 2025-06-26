import React from "react";

const FormDespesa = ({ novaDespesa, setNovaDespesa, onAdicionar }) => (
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
    <button onClick={onAdicionar}>Adicionar Despesa</button>
  </div>
);

export default FormDespesa;