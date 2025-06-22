import { useEffect, useState, useCallback } from "react";
import Menu from "../Menu/Menu";
import CadastroViagem from "./CadastroViagem";
import ItemViagem from "./ItemViagem";
import "./Viagem.css";

const Viagem = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [erro, setErro] = useState(null);
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

  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({
    titulo: "",
    dataPartida: "",
    dataChegada: "",
  });

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const buscarViagens = useCallback(async () => {
    try {
      const resposta = await fetch(
        `http://localhost:8080/viagem/usuario/${usuario.id}`
      );
      if (!resposta.ok) throw new Error("Erro ao buscar viagens");

      const dados = await resposta.json();
      console.log("Viagens recebidas:", dados);

      // Garante que seja sempre um array
      if (Array.isArray(dados)) {
        setViagens(dados);
      } else {
        setViagens([dados]);
      }
    } catch (err) {
      setErro(`Erro ao carregar viagens: ${err.message}`);
    }
  }, [usuario.id]); // Adicionando 'usuario.id' como dependência

  const preencherEnderecoViaCep = useCallback(async () => {
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
  }, [novaViagem.cep]); // Adicionando 'novaViagem.cep' como dependência

  const validarCep = (cep) => /^[0-9]{5}-?[0-9]{3}$/.test(cep);

  const validarDatas = (dataPartida, dataChegada) => {
    const hoje = new Date().toISOString().split("T")[0]; // Formato yyyy-mm-dd
    if (dataPartida < hoje) {
      alert("A data de partida não pode ser anterior à data atual.");
      return false;
    }
    if (dataChegada < dataPartida) {
      alert("A data de chegada não pode ser anterior à data de partida.");
      return false;
    }
    return true;
  };

const cadastrarViagem = async () => {
  console.log('usuario.id:', usuario.id);

  if (!usuario?.id) {
    setErro("Usuário não encontrado, por favor faça login.");
    return;
  }

  if (!validarDatas(novaViagem.dataPartida, novaViagem.dataChegada)) {
    return; // Não faz o cadastro se as datas não forem válidas
  }

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
  usuarioId: usuario.id,
};

    const resposta = await fetch("http://localhost:8080/viagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
    });

    // Log da resposta
    const textoErro = await resposta.text();
    console.log('Texto de erro (se houver):', textoErro);  // Verifique a mensagem de erro

    if (!resposta.ok) {
      throw new Error(textoErro || 'Erro desconhecido');
    }

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
    if (!validarDatas(formEdicao.dataPartida, formEdicao.dataChegada)) {
      return; // Não salva a edição se as datas não forem válidas
    }

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
        { method: "DELETE" }
      );

      if (!resposta.ok) throw new Error(await resposta.text());
      buscarViagens();
    } catch (err) {
      setErro(`Erro ao deletar viagem: ${err.message}`);
    }
  };

  useEffect(() => {
    if (usuario?.id) buscarViagens();
  }, [usuario, buscarViagens]);  // Adicionando 'buscarViagens' como dependência

  useEffect(() => {
    if (novaViagem.cep.length >= 8) preencherEnderecoViaCep();
  }, [novaViagem.cep, preencherEnderecoViaCep]);  // Adicionando 'preencherEnderecoViaCep' como dependência

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
