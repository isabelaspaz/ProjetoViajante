import { useState, useEffect } from "react";
import Botao from "../Botao/Botao";
import CampoInput from "../CampoInput/CampoInput";
import Formulario from "../Formulario/Formulario";

const NovaViagem = () => {
  const [titulo, setTitulo] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [dataChegada, setDataChegada] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [mensagem, setMensagem] = useState("");

  const dataAtual = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      buscarCep(cepLimpo);
    }
  }, [cep]);

  const buscarCep = async (cepLimpo) => {
    try {
      const resposta = await fetch(`https://opencep.com/v1/${cepLimpo}`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setRua(dados.logradouro || "");
        setBairro(dados.bairro || "");
        setCidade(dados.localidade || "");
        setEstado(dados.uf || "");
        setMensagem("");
      } else {
        setMensagem("CEP não encontrado.");
        setRua("");
        setBairro("");
        setCidade("");
        setEstado("");
      }
    } catch (error) {
      setMensagem("Erro ao consultar o CEP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
      setMensagem("Usuário não identificado. Faça login novamente.");
      return;
    }

    if (dataPartida < dataAtual || dataChegada < dataAtual) {
      setMensagem("As datas não podem ser anteriores à data atual.");
      return;
    }

    if (dataChegada < dataPartida) {
      setMensagem("A data de chegada não pode ser menor que a data de partida.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:8080/viagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          dataPartida,
          dataChegada,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
          usuarioId,
        }),
      });

      if (resposta.ok) {
        setMensagem("Viagem cadastrada com sucesso!");
        // Limpa os campos do formulário
        setTitulo("");
        setDataPartida("");
        setDataChegada("");
        setCep("");
        setRua("");
        setNumero("");
        setBairro("");
        setCidade("");
        setEstado("");
      } else {
        setMensagem("Erro ao cadastrar viagem.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="nova-viagem-container">
      <h2>Nova Viagem</h2>
      <Formulario onSubmit={handleSubmit}>
        <CampoInput
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          name="titulo"
          placeholder="Título da Viagem"
        />
        <CampoInput
          label="Data de Partida"
          type="date"
          value={dataPartida}
          onChange={(e) => setDataPartida(e.target.value)}
          name="dataPartida"
          placeholder="Selecione a data de partida"
        />
        <CampoInput
          label="Data de Chegada"
          type="date"
          value={dataChegada}
          onChange={(e) => setDataChegada(e.target.value)}
          name="dataChegada"
          placeholder="Selecione a data de chegada"
        />
        <CampoInput
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          name="cep"
          placeholder="Digite o CEP"
        />
        <CampoInput
          type="text"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          name="rua"
          placeholder="Digite a rua"
        />
        <CampoInput
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          name="numero"
          placeholder="Digite o número"
        />
        <CampoInput
          type="text"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          name="bairro"
          placeholder="Digite o bairro"
        />
        <CampoInput
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          name="cidade"
          placeholder="Digite a cidade"
        />
        <CampoInput
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          name="estado"
          placeholder="Digite o estado"
        />
        <Botao texto="Cadastrar Viagem" tipo="submit" />
      </Formulario>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default NovaViagem;
