import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export default function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("usuarioId", data.id);
      setUsuario(data); // salva no estado do app
      navigate("/menu"); // redireciona para a página do menu
    } else {
      alert("Login inválido");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
