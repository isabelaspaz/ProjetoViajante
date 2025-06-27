import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import FormularioUsuario from './FormularioUsuario';
import MensagensFeedback from './MensagensFeedback';
import './Configuracoes.css';

const Configuracoes = ({ usuario, setUsuario }) => {
  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    if (!usuario) {
      setMensagemErro('Você precisa estar logado para acessar esta página.');
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    const usuarioDTO = { nome, email };

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioDTO),
      });

      if (res.ok) {
        const dadosAtualizados = await res.json();
        setNome(dadosAtualizados.nome);
        setEmail(dadosAtualizados.email);
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setMensagemSucesso("Dados atualizados com sucesso!");
      } else {
        const erro = await res.text();
        setMensagemErro(erro);
      }
    } catch (error) {
      setMensagemErro('Erro ao atualizar dados. Tente novamente.');
    }
  };

  const handleExcluir = async () => {
    if (!window.confirm("Tem certeza que deseja excluir sua conta? Essa ação é irreversível.")) return;

    try {
      const res = await fetch(`http://localhost:8080/usuario/${usuario.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Conta excluída com sucesso!");
        setUsuario(null);
        window.location.href = '/';
      } else {
        const erro = await res.text();
        setMensagemErro(erro);
      }
    } catch (error) {
      setMensagemErro('Erro ao excluir conta. Tente novamente.');
    }
  };

  const handleSair = () => {
    setUsuario(null);
    window.location.href = '/';
  };

  return (
    <div>
      <Menu />
      <div className="configuracoes-container">
        <h2>Configurações de Conta</h2>

        <MensagensFeedback erro={mensagemErro} sucesso={mensagemSucesso} />

        <FormularioUsuario
          nome={nome}
          setNome={setNome}
          email={email}
          setEmail={setEmail}
          novaSenha={novaSenha}
          setNovaSenha={setNovaSenha}
          confirmarNovaSenha={confirmarNovaSenha}
          setConfirmarNovaSenha={setConfirmarNovaSenha}
          handleSubmit={handleSubmit}
        />

        <button
          style={{
            marginTop: '1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '0.7rem 1.2rem',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleExcluir}
        >
          Excluir Conta
        </button>

        <button
          style={{
            marginTop: '1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '0.7rem 1.2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
          onClick={handleSair}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Configuracoes;
