import React from "react";
import "./Formulario.css";

const Formulario = ({ children, onSubmit, className, ...props }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`formulario-container ${className || ""}`}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
};

export default Formulario;
