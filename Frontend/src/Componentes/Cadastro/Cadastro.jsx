import React, { useState } from "react";
import "./Cadastro.css";
const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const cadastrarUsuario = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        const obj = await resp.json();
        console.log("Usuário cadastrado com sucesso:", obj);
        alert("Deu boa")
      } else {
        console.error("Erro ao cadastrar usuário. Código:", resp.status);
                alert("errado")

      }
    } catch (error) {
      console.error("Erro na requisição:", error);
              alert(" deu merda")

    }
  };

  return (
    <>
      <header>
        <h1>Projeto ProjetoViajante</h1>
      </header>
      <section>
        <form id="formCadastro">
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              value={formData.senha}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={cadastrarUsuario}>
            Cadastrar Usuário
          </button>
        </form>
      </section>
    </>
  );
};

export default Cadastro;
