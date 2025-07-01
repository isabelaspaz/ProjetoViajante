const CampoSelect = ({ label, value, onChange, name, opcoes }) => {
  return (
    <div className="campo-select">
      <label>{label}</label>
      <select value={value} onChange={onChange} name={name}>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao.value}>{opcao.label}</option>
        ))}
      </select>
    </div>
  );
};
export default CampoSelect;