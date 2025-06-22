const CadastroViagem = ({ novaViagem, setNovaViagem, cadastrarViagem }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaViagem((prev) => ({ ...prev, [name]: value }));
  };

  const validarDatas = () => {
    const hoje = new Date().toISOString().split("T")[0]; // Formato yyyy-mm-dd
    if (novaViagem.dataPartida < hoje) {
      alert("A data de partida não pode ser anterior à data atual.");
      return false;
    }
    if (novaViagem.dataChegada < novaViagem.dataPartida) {
      alert("A data de chegada não pode ser anterior à data de partida.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarDatas()) {
      cadastrarViagem();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={novaViagem.titulo}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dataPartida"
        value={novaViagem.dataPartida}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dataChegada"
        value={novaViagem.dataChegada}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cep"
        placeholder="CEP"
        value={novaViagem.cep}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="rua"
        placeholder="Rua"
        value={novaViagem.rua}
        onChange={handleChange}
      />
      <input
        type="text"
        name="bairro"
        placeholder="Bairro"
        value={novaViagem.bairro}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cidade"
        placeholder="Cidade"
        value={novaViagem.cidade}
        onChange={handleChange}
      />
      <input
        type="text"
        name="estado"
        placeholder="Estado"
        value={novaViagem.estado}
        onChange={handleChange}
      />
      <input
        type="number"
        name="numero"
        placeholder="Número"
        value={novaViagem.numero}
        onChange={handleChange}
      />
      <button type="submit">Cadastrar Viagem</button>
    </form>
  );
};

export default CadastroViagem;
