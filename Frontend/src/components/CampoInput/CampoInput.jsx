import React from "react";
const CampoInput = ({ label, value, onChange, placeholder, name, type }) => {
  return (
    <div className="CampoInput">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} // Usando o placeholder para simular o comportamento desejado
      />
      <label className={value ? "active" : ""}>{label}</label> {/* Adicionando classe ativa ao label */}
    </div>
  );
};

export default CampoInput;
