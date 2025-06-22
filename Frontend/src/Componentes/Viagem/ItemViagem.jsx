const ItemViagem = ({
  viagem,
  editandoId,
  setEditandoId,
  formEdicao,
  setFormEdicao,
  salvarEdicao,
  deletarViagem,
  formatarData,
}) => {
  const estaEditando = editandoId === viagem.id;

  const validarDatas = () => {
    const hoje = new Date().toISOString().split("T")[0]; // Formato yyyy-mm-dd
    if (formEdicao.dataPartida < hoje) {
      alert("A data de partida não pode ser anterior à data atual.");
      return false;
    }
    if (formEdicao.dataChegada < formEdicao.dataPartida) {
      alert("A data de chegada não pode ser anterior à data de partida.");
      return false;
    }
    return true;
  };

  const salvarComValidacao = () => {
    if (validarDatas()) {
      salvarEdicao();
    }
  };

  return (
    <li
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {estaEditando ? (
        <>
          <input
            type="text"
            value={formEdicao.titulo}
            onChange={(e) =>
              setFormEdicao((prev) => ({ ...prev, titulo: e.target.value }))
            }
            placeholder="Título"
          />
          <br />
          <input
            type="date"
            value={formEdicao.dataPartida}
            onChange={(e) =>
              setFormEdicao((prev) => ({ ...prev, dataPartida: e.target.value }))
            }
          />
          <input
            type="date"
            value={formEdicao.dataChegada}
            onChange={(e) =>
              setFormEdicao((prev) => ({ ...prev, dataChegada: e.target.value }))
            }
          />
          <br />
          <button onClick={salvarComValidacao}>Salvar</button>
          <button onClick={() => setEditandoId(null)}>Cancelar</button>
        </>
      ) : (
        <>
          <strong>{viagem.titulo}</strong>
          <br />
          Partida: {formatarData(viagem.dataPartida)}
          <br />
          Chegada: {formatarData(viagem.dataChegada)}
          <br />
          Local: {viagem.cidade}, {viagem.estado}
          <br />
          <button
            onClick={() => {
              setEditandoId(viagem.id);
              setFormEdicao({
                titulo: viagem.titulo,
                dataPartida: viagem.dataPartida,
                dataChegada: viagem.dataChegada,
              });
            }}
          >
            Editar
          </button>
          <button onClick={() => deletarViagem(viagem.id)}>Excluir</button>
        </>
      )}
    </li>
  );
};

export default ItemViagem;
