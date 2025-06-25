import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';

const Configuracoes = ({ usuario }) => {
  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Verifica se o usuário está logado
  useEffect(() => {
    if (!usuario) {
      setMensagemErro('Você precisa estar logado para acessar esta página.');
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    const usuarioDTO = {
      nome,
      email,  // Captura o email do usuário logado
    };

    // Verifica se a senha foi alterada
    if (novaSenha && confirmarNovaSenha) {
      if (novaSenha !== confirmarNovaSenha) {
        setMensagemErro("As senhas não coincidem.");
        return;
      }
      usuarioDTO.novaSenha = novaSenha;
    }

    try {
      const res = await fetch(`http://localhost:8080/usuario/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioDTO),
      });

      if (res.ok) {
        setMensagemSucesso("Dados atualizados com sucesso!");
      } else {
        const erro = await res.text();
        setMensagemErro(erro);
      }
    } catch (error) {
      setMensagemErro('Erro ao atualizar dados. Tente novamente.');
    }
  };

  return (
    <div>
      <Menu />
      <h2>Configurações de Conta</h2>

      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      {mensagemSucesso && <p style={{ color: 'green' }}>{mensagemSucesso}</p>}

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
    </div>
  );
};

export default Configuracoes;
