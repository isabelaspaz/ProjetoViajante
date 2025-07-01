const Formulario = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="formulario-padrao">
      {children}
    </form>
  );
};
export default Formulario;