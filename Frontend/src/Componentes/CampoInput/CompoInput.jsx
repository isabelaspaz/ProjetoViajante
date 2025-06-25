import React from "react";

const CampoInput = ({ label, id, type, name, value, onChange, error }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
    {error && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

export default CampoInput;
