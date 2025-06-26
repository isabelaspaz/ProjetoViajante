import React from 'react';

const FormularioUsuario = ({
  nome,
  setNome,
  email,
  setEmail,
  novaSenha,
  setNovaSenha,
  confirmarNovaSenha,
  setConfirmarNovaSenha,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
    </div>

    <div>
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div>
      <label htmlFor="novaSenha">Nova Senha (opcional)</label>
      <input
        type="password"
        id="novaSenha"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
      <input
        type="password"
        id="confirmarNovaSenha"
        value={confirmarNovaSenha}
        onChange={(e) => setConfirmarNovaSenha(e.target.value)}
      />
    </div>

    <button type="submit">Salvar Alterações</button>
  </form>
);

export default FormularioUsuario;
