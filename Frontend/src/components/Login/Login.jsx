import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../Botao/Botao";
import CampoInput from "../CampoInput/CampoInput";
import Formulario from "../Formulario/Formulario";

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
          navigate("/menu");
        } else {
          setErro("Erro ao processar login. ID de usuário não recebido.");
        }
      } else {
        setErro("Login inválido. Verifique e-mail e senha.");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Login</h2>

      <Formulario onSubmit={handleSubmit}>
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
        <Botao className="btn-entrar" texto="Entrar" tipo="submit" />
      </Formulario>


      <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
        Não possui conta?{" "}
        <button
          onClick={() => navigate("/cadastro")}
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
          Cadastre-se
        </button>
      </p>

      {erro && <p className="mensagem" style={{ color: "red" }}>{erro}</p>}
    </div>
  );
};

export default Login;
