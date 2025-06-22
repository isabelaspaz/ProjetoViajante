
import "./CadastroViagem.css";
const CadastroViagem = ({ novaViagem, setNovaViagem, cadastrarViagem }) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Cadastrar nova viagem</h3>
      <input
        type="text"
        placeholder="Título"
        value={novaViagem.titulo}
        onChange={(e) => setNovaViagem({ ...novaViagem, titulo: e.target.value })}
      />
      <input
        type="date"
        value={novaViagem.dataPartida}
        onChange={(e) => setNovaViagem({ ...novaViagem, dataPartida: e.target.value })}
      />
      <input
        type="date"
        value={novaViagem.dataChegada}
        onChange={(e) => setNovaViagem({ ...novaViagem, dataChegada: e.target.value })}
      />
      <input
        type="text"
        placeholder="CEP"
        value={novaViagem.cep}
        onChange={(e) => setNovaViagem({ ...novaViagem, cep: e.target.value })}
      />
      <input
        type="text"
        placeholder="Número"
        value={novaViagem.numero}
        onChange={(e) => setNovaViagem({ ...novaViagem, numero: e.target.value })}
      />
      <input type="text" placeholder="Rua" value={novaViagem.rua} disabled />
      <input type="text" placeholder="Bairro" value={novaViagem.bairro} disabled />
      <input type="text" placeholder="Cidade" value={novaViagem.cidade} disabled />
      <input type="text" placeholder="Estado" value={novaViagem.estado} disabled />
      <button onClick={cadastrarViagem}>Cadastrar</button>
    </div>
  );
};

export default CadastroViagem;
