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
    if (!/^\d{8}$/.test(novaViagem.cep)) return;
    try {
      const resposta = await fetch(`https://opencep.com/v1/${novaViagem.cep}`);
      if (!resposta.ok) throw new Error("Erro ao buscar CEP");
      const dados = await resposta.json();
      setNovaViagem((prev) => ({
        ...prev,
        rua: dados.logradouro || "",
        bairro: dados.bairro || "",
        cidade: dados.localidade || "",
        estado: dados.uf || ""
      }));
    } catch (e) {
      setErro(`Erro ao preencher endereço: ${e.message}`);
    }
  }, [novaViagem.cep]);

  useEffect(() => {
    if (usuarioId) buscarViagens();
  }, [usuarioId, buscarViagens]);

  useEffect(() => {
    if (novaViagem.cep && novaViagem.cep.length === 8) {
      preencherEnderecoViaCep();
    }
  }, [novaViagem.cep, preencherEnderecoViaCep]);

  // ... o restante do código permanece igual
}
