// ItemViagem.jsx
const ItemViagem = ({
  viagem,
  editandoId,
  formEdicao,
  setFormEdicao,
  setEditandoId,
  salvarEdicao,
  deletarViagem,
  formatarData
}) => {
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
      {editandoId === viagem.id ? (
        <>
          <input
            type="text"
            value={formEdicao.titulo}
            onChange={(e) => setFormEdicao({ ...formEdicao, titulo: e.target.value })}
          />
          <input
            type="date"
            value={formEdicao.dataPartida}
            onChange={(e) => setFormEdicao({ ...formEdicao, dataPartida: e.target.value })}
          />
          <input
            type="date"
            value={formEdicao.dataChegada}
            onChange={(e) => setFormEdicao({ ...formEdicao, dataChegada: e.target.value })}
          />
          <button onClick={salvarEdicao}>Salvar</button>
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
          <button onClick={() => setEditandoId(viagem.id)}>Editar</button>
          <button onClick={() => deletarViagem(viagem.id)}>Deletar</button>
        </>
      )}
    </li>
  );
};

export default ItemViagem;
