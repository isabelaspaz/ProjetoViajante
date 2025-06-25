import React from "react";
import "./Login.css";
import FormularioLogin from "./FormularioLogin";

const Login = ({ setUsuario }) => {
  return (
    <main className="login-container">
      <h2>Bem-vindo de volta!</h2>
      <FormularioLogin setUsuario={setUsuario} />
    </main>
  );
};

export default Login;
