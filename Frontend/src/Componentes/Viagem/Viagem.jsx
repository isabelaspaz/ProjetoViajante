import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import "./Viagem.css";

const Viagem = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [erro, setErro] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({
    titulo: "",
    dataPartida: "",
    dataChegada: "",
  });
  const [novaViagem, setNovaViagem] = useState({
    titulo: "",
    dataPartida: "",
    dataChegada: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
  });

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const buscarViagens = async () => {
    try {
      const resposta = await fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`);
      if (!resposta.ok) throw new Error("Erro ao buscar viagens");
      const dados = await resposta.json();
      setViagens(dados);
    } catch (err) {
      setErro(`Erro ao carregar viagens: ${err.message}`);
    }
  };

  const validarCep = (cep) => /^[0-9]{5}-?[0-9]{3}$/.test(cep);

  const preencherEnderecoViaCep = async () => {
    try {
      if (!validarCep(novaViagem.cep)) return;

      const resposta = await fetch(`https://opencep.com/v1/${novaViagem.cep}`);
      if (!resposta.ok) throw new Error("Erro ao buscar CEP");

      const dados = await resposta.json();
      if (!dados || dados.error) throw new Error("CEP inválido");

      setNovaViagem((prev) => ({
        ...prev,
        rua: dados.logradouro || "",
        bairro: dados.bairro || "",
        cidade: dados.localidade || "",
        estado: dados.uf || "",
      }));
    } catch (e) {
      setErro(`Erro ao preencher endereço: ${e.message}`);
    }
  };

  const cadastrarViagem = async () => {
    try {
      if (!validarCep(novaViagem.cep)) throw new Error("CEP inválido.");

      const corpo = {
        titulo: novaViagem.titulo,
        dataPartida: novaViagem.dataPartida,
        dataChegada: novaViagem.dataChegada,
        cep: parseInt(novaViagem.cep.replace("-", "")),
        rua: novaViagem.rua,
        bairro: novaViagem.bairro,
        cidade: novaViagem.cidade,
        estado: novaViagem.estado,
        numero: novaViagem.numero ? parseInt(novaViagem.numero) : 0,
        usuarioID: usuario.id,
      };

      const resposta = await fetch("http://localhost:8080/viagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (!resposta.ok) throw new Error(await resposta.text());

      setNovaViagem({
        titulo: "",
        dataPartida: "",
        dataChegada: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: "",
      });
      buscarViagens();
    } catch (err) {
      setErro(`Erro ao cadastrar viagem: ${err.message}`);
    }
  };

  const editarViagem = (viagem) => {
    setEditandoId(viagem.id);
    setFormEdicao({
      titulo: viagem.titulo,
      dataPartida: viagem.dataPartida,
      dataChegada: viagem.dataChegada,
    });
  };

  const salvarEdicao = async () => {
    try {
      const resposta = await fetch(`http://localhost:8080/viagem/${editandoId}/usuario/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formEdicao.titulo,
          dataPartida: formEdicao.dataPartida,
          dataChegada: formEdicao.dataChegada,
        }),
      });

      if (!resposta.ok) throw new Error(await resposta.text());

      setEditandoId(null);
      setFormEdicao({ titulo: "", dataPartida: "", dataChegada: "" });
      buscarViagens();
    } catch (err) {
      setErro(`Erro ao editar viagem: ${err.message}`);
    }
  };

  const deletarViagem = async (id) => {
    if (!window.confirm("Deseja realmente deletar esta viagem?")) return;
    try {
      const resposta = await fetch(`http://localhost:8080/viagem/${id}/usuario/${usuario.id}`, {
        method: "DELETE",
      });
      if (!resposta.ok) throw new Error(await resposta.text());
      buscarViagens();
    } catch (err) {
      setErro(`Erro ao deletar viagem: ${err.message}`);
    }
  };

  useEffect(() => {
    if (usuario?.id) buscarViagens();
  }, [usuario]);

  useEffect(() => {
    if (novaViagem.cep.length >= 8) preencherEnderecoViaCep();
  }, [novaViagem.cep]);

  return (
    <>
      <Menu />
      <div className="container" style={{ padding: "2rem" }}>
        <h2>Minhas Viagens</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}

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

        {viagens.length === 0 ? (
          <p>Nenhuma viagem encontrada.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {viagens.map((viagem) => (
              <li
                key={viagem.id}
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
                    <button onClick={() => editarViagem(viagem)}>Editar</button>
                    <button onClick={() => deletarViagem(viagem.id)}>Deletar</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Viagem;
