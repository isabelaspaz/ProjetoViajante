import React from "react";
import Botao from "../Botao/Botao"; // Importando o componente Botao

const Modal = ({ titulo, onFechar, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-fechar">
        <Botao texto="Fechar" onClick={onFechar} tipo="button" /> {/* Usando o Botao em vez de button */}
        </div>
        <h3>{titulo}</h3>
        {children} {/* Renderiza o conteúdo do formulário ou outro conteúdo dentro do modal */}
      </div>
    </div>
  );
};

export default Modal;
