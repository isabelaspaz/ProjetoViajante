import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Viagens.css';

const Viagens = () => {
    const [viagens, setViagens] = useState([]);
    const [mostraForm, setMostraForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    const [novoTitulo, setNovoTitulo] = useState('');
    const [novoDataPartida, setNovoDataPartida] = useState('');
    const [novoDataChegada, setNovoDataChegada] = useState('');
    const [novoCep, setNovoCep] = useState('');
    const [novoCidade, setNovoCidade] = useState('');
    const [novoEstado, setNovoEstado] = useState('');

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    useEffect(() => {
        const usuarioLocal = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLocal) return;

        fetch(`http://localhost:8080/viagem/usuario/${usuarioLocal.id}`)
            .then(res => res.status === 204 ? [] : res.json())
            .then(data => setViagens(Array.isArray(data) ? data : []))
            .catch(console.error);
    }, []);


    const abrirForm = () => {
        limparForm();
        setEditandoId(null);
        setMostraForm(true);
    };

    const fecharForm = () => {
        limparForm();
        setEditandoId(null);
        setMostraForm(false);
    };

    const limparForm = () => {
        setNovoTitulo('');
        setNovoDataPartida('');
        setNovoDataChegada('');
        setNovoCep('');
        setNovoCidade('');
        setNovoEstado('');
    };

    const buscaCep = (cep) => {
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) {
            setNovoCidade('');
            setNovoEstado('');
            return;
        }

        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            .then(res => res.json())
            .then(data => {
                if (data.erro) {
                    setNovoCidade('');
                    setNovoEstado('');
                } else {
                    setNovoCidade(data.localidade);
                    setNovoEstado(data.uf);
                }
            })
            .catch(() => {
                setNovoCidade('');
                setNovoEstado('');
            });
    };

    const handleCepChange = (e) => {
        const cep = e.target.value;
        setNovoCep(cep);
        if (cep.replace(/\D/g, '').length === 8) {
            buscaCep(cep);
        } else {
            setNovoCidade('');
            setNovoEstado('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!usuario) return alert('Usuário não logado.');

        const viagemDados = {
            titulo: novoTitulo,
            dataPartida: novoDataPartida,
            dataChegada: novoDataChegada,
            cidade: novoCidade,
            estado: novoEstado,
            cep: novoCep,
            usuarioId: usuario.id // importante: o backend espera isso
        };

        if (editandoId) {
            fetch(`http://localhost:8080/viagem/${editandoId}/usuario/${usuario.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(viagemDados),
            })
                .then(res => {
                    if (!res.ok) throw new Error();
                    return res.json();
                })
                .then(data => {
                    setViagens(prev => prev.map(v => v.id === editandoId ? data : v));
                    toast.success('Viagem atualizada com sucesso!');
                    fecharForm();
                })
                .catch(() => toast.error('Erro ao editar viagem.'));
        } else {
            fetch('http://localhost:8080/viagem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(viagemDados),
            })
                .then(res => {
                    if (!res.ok) throw new Error();
                    return res.json();
                })
                .then(data => {
                    setViagens(prev => [...prev, data]);
                    toast.success('Viagem cadastrada com sucesso!');
                    fecharForm();
                })
                .catch(() => toast.error('Erro ao cadastrar viagem.'));
        }
    };

    const confirmarExclusao = (id) => {
        const toastId = toast.info(
            <div>
                <p>Tem certeza que deseja excluir essa viagem?</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '8px' }}>
                    <button
                        onClick={() => {
                            handleExcluir(id);
                            toast.dismiss(toastId);
                        }}
                        style={{
                            backgroundColor: '#d9534f',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                    >
                        Sim
                    </button>
                    <button
                        onClick={() => toast.dismiss(toastId)}
                        style={{
                            backgroundColor: '#5bc0de',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                    >
                        Não
                    </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                position: 'top-center'
            }
        );
    };

    const handleEditar = (viagem) => {
        setNovoTitulo(viagem.titulo);
        setNovoDataPartida(viagem.dataPartida);
        setNovoDataChegada(viagem.dataChegada);
        setNovoCep(viagem.cep);
        setNovoCidade(viagem.cidade);
        setNovoEstado(viagem.estado);
        setEditandoId(viagem.id);
        setMostraForm(true);
    };

    const handleExcluir = (id) => {
        fetch(`http://localhost:8080/viagem/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) throw new Error();
                setViagens(prev => prev.filter(v => v.id !== id));
                toast.success('Viagem excluída com sucesso!');
            })
            .catch(() => toast.error('Erro ao excluir viagem.'));
    };

    return (
        <div>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="titulo_e_mais">
                <h2 className="titulo-principal">Minhas viagens</h2>
                <button
                    onClick={abrirForm}
                    className="btn-nova-viagem"
                    aria-label="Nova viagem"
                >
                    +
                </button>
            </div>

            {mostraForm && (
                <form onSubmit={handleSubmit} className="form-viagem">
                    <input
                        placeholder="Nome"
                        value={novoTitulo}
                        onChange={e => setNovoTitulo(e.target.value)}
                        required
                    />
                    <small>Data de ida:</small>
                    <input
                        type="date"
                        value={novoDataPartida}
                        onChange={e => setNovoDataPartida(e.target.value)}
                        required
                    />
                    <small>Data de volta:</small>
                    <input
                        type="date"
                        value={novoDataChegada}
                        onChange={e => setNovoDataChegada(e.target.value)}
                        required
                    />
                    <input
                        placeholder="CEP"
                        value={novoCep}
                        onChange={handleCepChange}
                        maxLength={9}
                        required
                    />
                    <input
                        placeholder="Cidade"
                        value={novoCidade}
                        onChange={e => setNovoCidade(e.target.value)}
                        readOnly
                        required
                    />
                    <input
                        placeholder="Estado"
                        value={novoEstado}
                        onChange={e => setNovoEstado(e.target.value)}
                        readOnly
                        required
                    />
                    <button type="submit">{editandoId ? 'Salvar alterações' : 'Salvar Viagem'}</button>
                    <button type="button" onClick={fecharForm}>Cancelar</button>
                </form>
            )}

            <div className="lista-viagens">
                {viagens.length === 0 ? (
                    <p className="sem-viagens">Nenhuma viagem cadastrada.</p>
                ) : (
                    viagens.map(v => (
                        <div key={v.id} className="viagem-card">
                            <h3>{v.titulo}</h3>
                            <p>Partida: {v.dataPartida}</p>
                            <p>Chegada: {v.dataChegada}</p>
                            <p>Destino: {v.cidade} - {v.estado}</p>
                            <p>CEP: {v.cep}</p>
                            <div className="acoes-card">
                                <img
                                    src="/editar-texto.png"
                                    alt="Editar"
                                    className="icone-acao"
                                    onClick={() => handleEditar(v)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => { if (e.key === 'Enter') handleEditar(v); }}
                                />
                                <img
                                    src="/excluir.png"
                                    alt="Excluir"
                                    className="icone-acao"
                                    onClick={() => confirmarExclusao(v.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => { if (e.key === 'Enter') confirmarExclusao(v.id); }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Viagens;
