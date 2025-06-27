import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import FormularioUsuario from './FormularioUsuario';
import MensagensFeedback from './MensagensFeedback';
import './Configuracoes.css'; // Certifique-se de criar esse arquivo com o CSS sugerido

const Configuracoes = ({ usuario }) => {
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
      </div>
    </div>
  );
};

export default Configuracoes;
