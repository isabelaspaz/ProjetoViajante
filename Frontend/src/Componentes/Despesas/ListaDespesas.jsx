import React from "react";

const ListaDespesas = ({ despesas = [], onExcluir }) => (
  <ul>
    {despesas.map((despesa) => (
      <li key={despesa.id}>
        <strong>{despesa.nome}</strong> - Qtd: {despesa.quantidade} - R$ {Number(despesa.preco).toFixed(2)}
        <button
          onClick={() => onExcluir(despesa.id)}
          style={{
            marginLeft: "1rem",
            color: "white",
            backgroundColor: "red",
            border: "none",
            padding: "0.3rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          Excluir
        </button>
      </li>
    ))}
  </ul>
);

export default ListaDespesas;
