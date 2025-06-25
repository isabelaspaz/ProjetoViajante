import Menu from "../Menu/Menu";
import CadastroViagem from "./CadastroViagem";
import ItemViagem from "./ItemViagem";
import UseViagens from "./UseViagens";
import "./Viagem.css";

const Viagem = ({ usuario }) => {
  const {
    viagens, erro, novaViagem, setNovaViagem,
    cadastrarViagem, editandoId, setEditandoId,
    formEdicao, setFormEdicao, salvarEdicao, deletarViagem
  } = UseViagens(usuario.id);

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  return (
    <>
      <Menu />
      <div className="container" style={{ padding: "2rem" }}>
        <h2>Minhas Viagens</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <CadastroViagem
          novaViagem={novaViagem}
          setNovaViagem={setNovaViagem}
          cadastrarViagem={cadastrarViagem}
        />

        {viagens.length === 0 ? (
          <p>Nenhuma viagem encontrada.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {viagens.map((viagem) => (
              <ItemViagem
                key={viagem.id}
                viagem={viagem}
                editandoId={editandoId}
                setEditandoId={setEditandoId}
                formEdicao={formEdicao}
                setFormEdicao={setFormEdicao}
                salvarEdicao={salvarEdicao}
                deletarViagem={deletarViagem}
                formatarData={formatarData}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Viagem;
