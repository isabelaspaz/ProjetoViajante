import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Formulario from "../Formulario/Formulario";
import MensagemFeedback from "../MensagemFeedback/MensagemFeedback";
import Navbar from "../Navbar/Navbar";
import "./Configuracoes.css"; // Importando o CSS para estilização

const Configuracoes = () => {
  const [usuario, setUsuario] = useState({ nome: "", email: "" });
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    buscarDadosUsuario();
  }, []);

  const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const senhaValida = (senha) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);

  const buscarDadosUsuario = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    try {
      const resp = await fetch(`http://localhost:8080/usuario/${usuarioId}`);
      if (resp.ok) {
        const dados = await resp.json();
        setUsuario({ nome: dados.nome, email: dados.email });
      } else {
        setMensagem("Erro ao buscar dados do usuário.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const salvar = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    if (!emailValido(usuario.email)) {
      setMensagem("Digite um e-mail válido.");
      return;
    }

    if (novaSenha) {
      if (!senhaValida(novaSenha)) {
        setMensagem("A nova senha deve conter no mínimo 8 caracteres, uma letra maiúscula e um número.");
        return;
      }
      if (novaSenha !== confirmarSenha) {
        setMensagem("As senhas não coincidem.");
        return;
      }
    }

    const corpo = {
      nome: usuario.nome,
      email: usuario.email,
      novaSenha: novaSenha || null,
    };

    try {
      const resp = await fetch(`http://localhost:8080/usuario/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (resp.ok) {
        setMensagem("Dados atualizados com sucesso.");
        setNovaSenha("");
        setConfirmarSenha("");
        localStorage.removeItem("usuarioId");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        const erro = await resp.text();
        setMensagem(`Erro ao atualizar: ${erro}`);
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="configuracoes-container">
      <Navbar />

      {/* Botão X para voltar */}
      <button
        className="botao-fechar"
        aria-label="Voltar"
        onClick={() => navigate("/tela-inicial")}
        type="button"
      >
        &times;
      </button>

      <h2>Configurações da Conta</h2>
      <MensagemFeedback mensagem={mensagem} />

      <Formulario onSubmit={(e) => { e.preventDefault(); salvar(); }}>
        <input
          className="campo-nome"
          placeholder="Nome"
          value={usuario.nome}
          onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
          required
        />
        <input
          className="campo-email"
          placeholder="E-mail"
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          required
          type="email"
        />
        <input
          placeholder="Nova senha"
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <input
          placeholder="Confirmar nova senha"
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <button className="botao-salvar" type="submit">Salvar Alterações</button>
      </Formulario>
    </div>
  );
};

export default Configuracoes;
