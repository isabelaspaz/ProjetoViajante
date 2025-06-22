import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import CadastroViagem from "./CadastroViagem";
import ItemViagem from "./ItemViagem";
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
      const resposta = await fetch(
        `http://localhost:8080/viagem/usuario/${usuario.id}`
      );
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

  const salvarEdicao = async () => {
    try {
      const resposta = await fetch(
        `http://localhost:8080/viagem/${editandoId}/usuario/${usuario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: formEdicao.titulo,
            dataPartida: formEdicao.dataPartida,
            dataChegada: formEdicao.dataChegada,
          }),
        }
      );

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
      const resposta = await fetch(
        `http://localhost:8080/viagem/${id}/usuario/${usuario.id}`,
        {
          method: "DELETE",
        }
      );

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
                formEdicao={formEdicao}
                setFormEdicao={setFormEdicao}
                setEditandoId={setEditandoId}
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
