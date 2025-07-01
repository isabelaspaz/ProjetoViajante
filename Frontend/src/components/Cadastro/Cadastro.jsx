import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Formulario from "../Formulario/Formulario";
import CampoInput from "../CampoInput/CampoInput";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const senhaValida = (senha) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (!emailValido(email)) {
      setMensagem("Digite um e-mail válido.");
      return;
    }

    if (!senhaValida(senha)) {
      setMensagem(
        "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula e um número."
      );
      return;
    }

    try {
      const resposta = await fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (resposta.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMensagem("Erro ao cadastrar usuário.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>

      <Formulario onSubmit={handleSubmit}>
        <CampoInput
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          name="nome"
        />
        <CampoInput
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <CampoInput
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          name="senha"
        />

        <button className="botao-trip" type="submit">
          Cadastrar
        </button>
      </Formulario>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
        Já possui conta?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            border: "none",
            color: "#00aa6c",
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline",
            padding: 0,
            fontSize: "1rem",
          }}
        >
          Fazer login
        </button>
      </p>
    </div>
  );
};

export default Cadastro;
