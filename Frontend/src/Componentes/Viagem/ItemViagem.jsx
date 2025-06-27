const ItemViagem = ({
  viagem,
  editandoId,
  setEditandoId,
  formEdicao,
  setFormEdicao,
  salvarEdicao,
  deletarViagem,
  formatarData
}) => {

  const editando = editandoId === viagem.id;

  return (
    <li>
      {editando ? (
        <>
          <input
            type="text"
            value={formEdicao.titulo}
            onChange={(e) =>
              setFormEdicao({ ...formEdicao, titulo: e.target.value })
            }
          />
          <input
            type="date"
            value={formEdicao.dataPartida}
            onChange={(e) =>
              setFormEdicao({ ...formEdicao, dataPartida: e.target.value })
            }
          />
          <input
            type="date"
            value={formEdicao.dataChegada}
            onChange={(e) =>
              setFormEdicao({ ...formEdicao, dataChegada: e.target.value })
            }
          />
          <button onClick={salvarEdicao}>Salvar</button>
          <button onClick={() => setEditandoId(null)}>Cancelar</button>
        </>
      ) : (
        <>
          <strong>{viagem.titulo}</strong>
          <p>Partida: {formatarData(viagem.dataPartida)}</p>
          <p>Chegada: {formatarData(viagem.dataChegada)}</p>
          <button onClick={() => {
            setEditandoId(viagem.id);
            setFormEdicao({
              titulo: viagem.titulo,
              dataPartida: viagem.dataPartida,
              dataChegada: viagem.dataChegada
            });
          }}>
            Editar
          </button>
          <button onClick={() => deletarViagem(viagem.id)}>
            Excluir
          </button>
        </>
      )}
    </li>
  );
};

export default ItemViagem;
