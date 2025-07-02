import "./CardViagem.css";

const CardViagem = ({ viagem, onEditar, onExcluir, qtdMochilas, totalDespesas }) => {
  return (
    <div className="card-viagem">
      <h3>{viagem.titulo}</h3>
      <p>Cidade: {viagem.cidade}</p>
      <p>Estado: {viagem.estado}</p>
      <p>Data da partida: {viagem.dataPartida || "-"}</p>
      <p>Data da chegada: {viagem.dataChegada || "-"}</p>
      <p>Mochilas: {qtdMochilas}</p>
      <p>
        Custo total: R${""}
        {typeof totalDespesas === "number" ? totalDespesas.toFixed(2) : "0.00"}
      </p>

      {(onEditar || onExcluir) && (
        <div className="card-viagem-botoes">
          {onEditar && (
            <button
              className="btn-editar"
              onClick={() => onEditar(viagem)}
              type="button"
            >
              Editar
            </button>
          )}
          {onExcluir && (
            <button
              className="btn-excluir"
              onClick={() => onExcluir(viagem.id)}
              type="button"
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardViagem;
