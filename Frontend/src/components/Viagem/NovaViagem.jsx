import { useState, useEffect } from "react";
import Formulario from "../Formulario/Formulario";
import "./NovaViagem.css";

const NovaViagem = ({ onClose }) => {
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
        // Limpa campos
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
    <div className="nova-viagem-overlay">
      <div className="nova-viagem-container">
        <button
          className="btn-fechar"
          onClick={onClose}
          aria-label="Fechar modal"
          type="button"
        >
          &times;
        </button>

        <h2>Nova viagem</h2>

        <Formulario onSubmit={handleSubmit}>
          <div className="campo">
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              name="titulo"
              placeholder="Nome da viagem"
              required
            />
          </div>

          <div className="campo">
            <small>Selecione a data de ida</small>
            <input
              type="date"
              value={dataPartida}
              onChange={(e) => setDataPartida(e.target.value)}
              name="dataPartida"
              required
              min={dataAtual}
            />
          </div>

          <div className="campo">
            <small>Selecione a data de volta</small>
            <input
              type="date"
              value={dataChegada}
              onChange={(e) => setDataChegada(e.target.value)}
              name="dataChegada"
              required
              min={dataAtual}
            />
          </div>

          <div className="campo">
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              name="cep"
              placeholder="CEP"
              maxLength={9}
            />
          </div>

          <div className="campo">
            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              name="rua"
              placeholder="Rua"
            />
          </div>

          <div className="campo">
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              name="numero"
              placeholder="Número"
            />
          </div>

          <div className="campo">
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              name="bairro"
              placeholder="Bairro"
            />
          </div>

          <div className="campo">
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              name="cidade"
              placeholder="Cidade"
            />
          </div>

          <div className="campo">
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              name="estado"
              placeholder="Estado"
            />
          </div>

          <button className="btn-cadastrar" type="submit">
            Cadastrar
          </button>
        </Formulario>

        {mensagem && (
          <p className={mensagem.includes("sucesso") ? "sucesso" : "erro"}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
};

export default NovaViagem;
