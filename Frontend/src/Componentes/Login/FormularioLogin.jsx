import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoInput from "../CampoInput/CompoInput";

const FormularioLogin = ({ setUsuario }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("usuarioId", data.id);
        setUsuario(data);
        navigate("/menu");
      } else {
        alert("Login inválido");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleNovoCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <form onSubmit={handleLogin}>
      <CampoInput
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CampoInput
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit">Entrar</button>
      <button type="button" onClick={handleNovoCadastro}>
        Novo Cadastro
      </button>
    </form>
  );
};

export default FormularioLogin;
