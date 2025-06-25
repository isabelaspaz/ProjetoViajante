import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoInput from "../CampoInput/CompoInput";
const FormularioCadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validarEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const validarSenha = (senha) =>
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(senha);

  const cadastrarUsuario = async (e) => {
    e.preventDefault();
    setErrors({});

    let formIsValid = true;
    const novosErros = {};

    if (!validarEmail(formData.email)) {
      novosErros.email = "Por favor, insira um email válido.";
      formIsValid = false;
    }

    if (!validarSenha(formData.senha)) {
      novosErros.senha = "A senha precisa ter no mínimo 8 caracteres, 1 número e 1 letra maiúscula.";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(novosErros);
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        const errorMessage = await resp.text();
        alert(`Erro ao cadastrar usuário: ${errorMessage}`);
      }
    } catch (error) {
      alert("Erro na requisição.");
    }
  };

  return (
    <form onSubmit={cadastrarUsuario} id="formCadastro">
      <CampoInput
        label="Nome"
        id="nome"
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
      />
      <CampoInput
        label="E-mail"
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <CampoInput
        label="Senha"
        id="senha"
        type="password"
        name="senha"
        value={formData.senha}
        onChange={handleChange}
        error={errors.senha}
      />
      <button type="submit">Cadastrar Usuário</button>
    </form>
  );
};

export default FormularioCadastro;
