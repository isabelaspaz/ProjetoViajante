import Botao from "../Botao/Botao";

const CardViagem = ({ viagem, onEditar, onExcluir, qtdMochilas, totalDespesas }) => {
  return (
    <div className="card-viagem">
      <h3>{viagem.titulo}</h3>
      <p>Cidade: {viagem.cidade}</p>
      <p>Estado: {viagem.estado}</p>
      <p>Data de Partida: {viagem.dataPartida || "-"}</p>
      <p>Data de Chegada: {viagem.dataChegada || "-"}</p>
      <p>Mochilas cadastradas: {qtdMochilas}</p>
      <p>
        Valor total das despesas: R$ {typeof totalDespesas === "number" ? totalDespesas.toFixed(2) : "0.00"}
      </p>

      {onEditar && <Botao texto="Editar" onClick={() => onEditar(viagem)} />}
      {onExcluir && <Botao texto="Excluir" onClick={() => onExcluir(viagem.id)} />}
    </div>
  );
};

export default CardViagem;
