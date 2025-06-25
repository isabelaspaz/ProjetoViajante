import { useState, useEffect, useCallback } from "react";

export default function UseViagens(usuarioId) {
  const [viagens, setViagens] = useState([]);
  const [erro, setErro] = useState(null);
  const [novaViagem, setNovaViagem] = useState({
    titulo: "", dataPartida: "", dataChegada: "", cep: "", rua: "", bairro: "",
    cidade: "", estado: "", numero: ""
  });
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({
    titulo: "", dataPartida: "", dataChegada: ""
  });

  const buscarViagens = useCallback(async () => {
    try {
      const resp = await fetch(`http://localhost:8080/viagem/usuario/${usuarioId}`);
      if (!resp.ok) throw new Error("Erro ao buscar viagens");
      const dados = await resp.json();
      setViagens(Array.isArray(dados) ? dados : [dados]);
    } catch (err) {
      setErro(err.message);
    }
  }, [usuarioId]);

  const preencherEnderecoViaCep = useCallback(async () => {
    if (!/^[0-9]{5}-?[0-9]{3}$/.test(novaViagem.cep)) return;
    try {
      const resposta = await fetch(`https://opencep.com/v1/${novaViagem.cep}`);
      if (!resposta.ok) throw new Error("Erro ao buscar CEP");
      const dados = await resposta.json();
      setNovaViagem((prev) => ({
        ...prev,
        rua: dados.logradouro || "", bairro: dados.bairro || "",
        cidade: dados.localidade || "", estado: dados.uf || ""
      }));
    } catch (e) {
      setErro(`Erro ao preencher endereço: ${e.message}`);
    }
  }, [novaViagem.cep]);

  const validarDatas = (partida, chegada) => {
    const hoje = new Date().toISOString().split("T")[0];
    if (partida < hoje || chegada < partida) return false;
    return true;
  };

  const cadastrarViagem = async () => {
    if (!usuarioId) {
      setErro("Usuário não encontrado.");
      return;
    }

    if (!validarDatas(novaViagem.dataPartida, novaViagem.dataChegada)) {
      alert("Datas inválidas."); return;
    }

    const corpo = {
      ...novaViagem,
      cep: parseInt(novaViagem.cep.replace("-", "")),
      numero: parseInt(novaViagem.numero || 0),
      usuarioId
    };

    try {
      const resp = await fetch("http://localhost:8080/viagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo)
      });

      if (!resp.ok) throw new Error(await resp.text());
      setNovaViagem({ titulo: "", dataPartida: "", dataChegada: "", cep: "", rua: "", bairro: "", cidade: "", estado: "", numero: "" });
      buscarViagens();
    } catch (err) {
      setErro(err.message);
    }
  };

  const salvarEdicao = async () => {
    if (!validarDatas(formEdicao.dataPartida, formEdicao.dataChegada)) return;

    try {
      const resp = await fetch(`http://localhost:8080/viagem/${editandoId}/usuario/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdicao)
      });
      if (!resp.ok) throw new Error(await resp.text());
      setEditandoId(null);
      setFormEdicao({ titulo: "", dataPartida: "", dataChegada: "" });
      buscarViagens();
    } catch (err) {
      setErro(err.message);
    }
  };

  const deletarViagem = async (id) => {
    if (!window.confirm("Deseja realmente deletar esta viagem?")) return;
    try {
      const resp = await fetch(`http://localhost:8080/viagem/${id}/usuario/${usuarioId}`, { method: "DELETE" });
      if (!resp.ok) throw new Error(await resp.text());
      buscarViagens();
    } catch (err) {
      setErro(err.message);
    }
  };

  useEffect(() => {
    if (usuarioId) buscarViagens();
  }, [usuarioId, buscarViagens]);

  useEffect(() => {
    if (novaViagem.cep.length >= 8) preencherEnderecoViaCep();
  }, [novaViagem.cep, preencherEnderecoViaCep]);

  return {
    viagens,
    erro,
    novaViagem,
    setNovaViagem,
    cadastrarViagem,
    editandoId,
    setEditandoId,
    formEdicao,
    setFormEdicao,
    salvarEdicao,
    deletarViagem
  };
}
