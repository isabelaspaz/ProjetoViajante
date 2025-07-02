import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Formulario from "../Formulario/Formulario";
import "./Login.css"; // CSS para a centralização

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        if (dados && dados.id) {
          localStorage.setItem("usuarioId", dados.id);
          navigate("/tela-inicial");
        } else {
          setErro("Erro ao processar login. ID de usuário não recebido.");
        }
      } else {
        setErro("Login inválido. Verifique e-mail e senha.");
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="pagina-centralizada">
      <Formulario onSubmit={handleSubmit} className="formulario-container">
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>

        <p className="link-redirect">
          Não possui conta?{" "}
          <a
            role="button"
            tabIndex={0}
            onClick={() => navigate("/cadastro")}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/cadastro");
            }}
          >
            Cadastre-se
          </a>
        </p>

        {erro && <p className="mensagem-feedback">{erro}</p>}
      </Formulario>
    </div>
  );
};

export default Login;
