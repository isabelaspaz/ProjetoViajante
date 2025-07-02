import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Formulario from "../Formulario/Formulario";
import "./Cadastro.css"; // vamos colocar o CSS da centralização aqui

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
    <div className="pagina-centralizada">
      <Formulario onSubmit={handleSubmit} className="formulario-container">
        <h2>Cadastro</h2>

        <input
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          name="nome"
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          name="senha"
          required
        />

        <button type="submit">Cadastrar</button>

        {mensagem && (
          <p
            className={`mensagem ${mensagem.toLowerCase().includes("sucesso")
                ? "mensagem-sucesso"
                : "mensagem-feedback"
              }`}
          >
            {mensagem}
          </p>
        )}

        <p className="link-redirect" style={{ marginTop: "1.5rem" }}>
          Já possui conta?{" "}
          <a
            role="button"
            tabIndex={0}
            onClick={() => navigate("/login")}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/login");
            }}
          >
            Fazer login
          </a>
        </p>
      </Formulario>
    </div>
  );
};

export default Cadastro;
