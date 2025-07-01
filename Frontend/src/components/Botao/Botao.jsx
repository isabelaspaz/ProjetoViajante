// Botao.js

const Botao = ({ texto, onClick, tipo = "button", className = "" }) => {
  return (
    <button type={tipo} onClick={onClick} className={`botao ${className}`}>
      {texto}
    </button>
  );
};

export default Botao;
