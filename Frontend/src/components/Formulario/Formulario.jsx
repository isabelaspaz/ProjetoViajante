import React from "react";
import "./Formulario.css";

const Formulario = ({ children, onSubmit, className = "", modoModal = false, ...props }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`formulario-container ${className} ${modoModal ? "formulario-modal" : ""}`}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
};

export default Formulario;
