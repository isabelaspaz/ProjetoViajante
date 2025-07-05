import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Mochilas.css';

const AdicionarItemForm = ({ mochilaId, onItemAdicionado }) => {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome.trim()) {
            toast.error('Informe o nome do item');
            return;
        }
        if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
            toast.error('Informe uma quantidade válida');
            return;
        }

        const novoItem = {
            nome: nome.trim(),
            quantidade: Number(quantidade),
            mochila: { id: mochilaId },
            usuario: { id: usuario.id },
        };

        fetch('http://localhost:8080/mochilaItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoItem),
        })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao adicionar item');
                return res.json();
            })
            .then(data => {
                onItemAdicionado(data);
                setNome('');
                setQuantidade('');
                toast.success('Item adicionado!');
            })
            .catch(() => toast.error('Erro ao adicionar item'));
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            onClick={e => e.stopPropagation()} // evita fechar o card ao clicar aqui
        >
            <input
                type="text"
                placeholder="Nome do item"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                style={{ flex: 2, padding: '0.3rem' }}
            />
            <input
                type="number"
                placeholder="Qtd"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
                required
                min="1"
                style={{ width: '60px', padding: '0.3rem' }}
            />
            <button type="submit" style={{ padding: '0.3rem 0.7rem' }}>
                Adicionar
            </button>
        </form>
    );
};

const Mochilas = () => {
    const [mochilas, setMochilas] = useState([]);
    const [viagens, setViagens] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal/form estados
    const [mostrarForm, setMostrarForm] = useState(false);
    const [novaMochilaTitulo, setNovaMochilaTitulo] = useState('');
    const [viagemSelecionadaId, setViagemSelecionadaId] = useState('');
    const [mochilaEditando, setMochilaEditando] = useState(null);
    const [mochilaExpandidaId, setMochilaExpandidaId] = useState(null);

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    useEffect(() => {
        if (!usuario) return;
        fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`)
            .then(res => (res.status === 204 ? [] : res.json()))
            .then(data => setViagens(Array.isArray(data) ? data : []))
            .catch(() => toast.error('Erro ao carregar viagens'));
    }, [usuario]);

    useEffect(() => {
        if (!viagemSelecionadaId) {
            setMochilas([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        fetch(`http://localhost:8080/mochila/${viagemSelecionadaId}`)
            .then(res => (res.status === 204 ? [] : res.json()))
            .then(data => setMochilas(Array.isArray(data) ? data : []))
            .catch(() => toast.error('Erro ao carregar mochilas'))
            .finally(() => setLoading(false));
    }, [viagemSelecionadaId]);

    // Abre form para nova mochila ou edição
    const abrirForm = (mochila = null) => {
        if (mochila) {
            // Editar mochila
            setNovaMochilaTitulo(mochila.titulo);
            setMochilaEditando(mochila);
            if (mochila.viagem && mochila.viagem.id) {
                setViagemSelecionadaId(mochila.viagem.id.toString());
            }
        } else {
            // Nova mochila
            setNovaMochilaTitulo('');
            setMochilaEditando(null);
        }
        setMostrarForm(true);
    };

    const fecharForm = () => {
        setMostrarForm(false);
        setMochilaEditando(null);
        setNovaMochilaTitulo('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!viagemSelecionadaId) {
            toast.error('Selecione uma viagem para adicionar a mochila');
            return;
        }
        if (!novaMochilaTitulo) {
            toast.error('Informe o título da mochila');
            return;
        }

        const mochilaDados = {
            titulo: novaMochilaTitulo,
            viagem: { id: Number(viagemSelecionadaId) },
            usuario: { id: usuario.id },
            mochilaItens: [],
        };

        if (mochilaEditando) {
            // Edição
            fetch(`http://localhost:8080/mochila/${mochilaEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mochilaDados),
            })
                .then(res => {
                    if (!res.ok) throw new Error('Erro ao editar mochila');
                    return res.json();
                })
                .then(data => {
                    toast.success('Mochila editada com sucesso!');
                    setMochilas(prev => prev.map(m => (m.id === data.id ? data : m)));
                    fecharForm();
                })
                .catch(() => toast.error('Erro ao editar mochila.'));
        } else {
            // Criação
            fetch('http://localhost:8080/mochila', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mochilaDados),
            })
                .then(res => {
                    if (!res.ok) throw new Error('Erro ao criar mochila');
                    return res.json();
                })
                .then(data => {
                    toast.success('Mochila criada com sucesso!');
                    setMochilas(prev => [...prev, data]);
                    fecharForm();
                })
                .catch(() => toast.error('Erro ao criar mochila.'));
        }
    };

    const handleEditarMochila = (mochila) => {
        abrirForm(mochila);
    };

    const toggleExpandirMochila = (id) => {
        if (mochilaExpandidaId === id) {
            setMochilaExpandidaId(null);
        } else {
            setMochilaExpandidaId(id);
            // Busca os itens da mochila se não tiver carregado ainda
            const mochila = mochilas.find(m => m.id === id);
            if (mochila && (!mochila.mochilaItens || mochila.mochilaItens.length === 0)) {
                fetch(`http://localhost:8080/mochila/${id}/itens`)
                    .then(res => res.json())
                    .then(itens => {
                        setMochilas(prev =>
                            prev.map(m => (m.id === id ? { ...m, mochilaItens: itens } : m))
                        );
                    })
                    .catch(() => toast.error('Erro ao carregar itens da mochila.'));
            }
        }
    };

    const handleExcluirMochila = (id) => {
        if (window.confirm('Deseja realmente excluir esta mochila?')) {
            fetch(`http://localhost:8080/mochila/${id}`, { method: 'DELETE' })
                .then(res => {
                    if (!res.ok) throw new Error('Erro ao excluir mochila');
                    toast.success('Mochila excluída com sucesso!');
                    setMochilas(prev => prev.filter(m => m.id !== id));
                    if (mochilaExpandidaId === id) setMochilaExpandidaId(null);
                })
                .catch(() => toast.error('Erro ao excluir mochila.'));
        }
    };

    const handleExcluirItem = (itemId, mochilaId) => {
        if (!window.confirm('Deseja realmente excluir este item?')) return;

        fetch(`http://localhost:8080/mochilaItem/${itemId}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao excluir item');
                toast.success('Item excluído com sucesso!');
                setMochilas(prev =>
                    prev.map(mochila =>
                        mochila.id === mochilaId
                            ? { ...mochila, mochilaItens: mochila.mochilaItens.filter(item => item.id !== itemId) }
                            : mochila
                    )
                );
            })
            .catch(() => toast.error('Erro ao excluir item.'));
    };

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '1rem' }}>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="titulo_e_mais" style={{ marginBottom: '1rem' }}>
                <h2 className="titulo-principal">Mochilas</h2>
                <button className="btn-nova-viagem" onClick={() => abrirForm(null)}>
                    +
                </button>
            </div>

            <div className="form-viagem" style={{ marginBottom: '2rem' }}>
                <label htmlFor="select-viagem" style={{ flex: '1 1 100%' }}>
                    Selecione a viagem:
                    <select
                        id="select-viagem"
                        value={viagemSelecionadaId}
                        onChange={(e) => setViagemSelecionadaId(e.target.value)}
                        style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem', fontSize: '1rem', borderRadius: 'var(--border-radius)', border: '1px solid #ccc' }}
                    >
                        <option value="">-- Escolha a viagem --</option>
                        {viagens.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.titulo}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {mostrarForm && (
                <form onSubmit={handleSubmit} className="form-viagem" style={{ marginBottom: '2rem' }}>
                    <div>
                        <label htmlFor="titulo-mochila">Título da mochila:</label>
                        <input
                            id="titulo-mochila"
                            type="text"
                            value={novaMochilaTitulo}
                            onChange={(e) => setNovaMochilaTitulo(e.target.value)}
                            required
                            placeholder="Ex: Mochila de viagem"
                        />
                    </div>
                    <button type="submit">{mochilaEditando ? 'Salvar Alterações' : 'Salvar Mochila'}</button>
                    <button type="button" onClick={fecharForm} style={{ marginLeft: '0.5rem' }}>
                        Cancelar
                    </button>
                </form>
            )}

            <div className="lista-viagens">
                {loading ? (
                    <p>Carregando mochilas...</p>
                ) : mochilas.length === 0 ? (
                    <p className="sem-viagens">Nenhuma mochila cadastrada para esta viagem.</p>
                ) : (
                    mochilas.map((m) => (
                        <div
                            key={m.id}
                            className="viagem-card"
                            style={{
                                position: 'relative',
                                cursor: 'pointer',
                                padding: '1rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                marginBottom: '1rem',
                            }}
                            onClick={() => toggleExpandirMochila(m.id)}
                        >
                            <h3>{m.titulo}</h3>

                            <div
                                className="acoes-card"
                                onClick={(e) => e.stopPropagation()}
                                style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '0.5rem' }}
                            >
                                <button
                                    onClick={() => handleEditarMochila(m)}
                                    aria-label={`Editar mochila ${m.titulo}`}
                                    className="icone-acao"
                                    type="button"
                                    title="Editar mochila"
                                    style={{ background: 'none', border: 'none', padding: 0 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-edit-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17 3a2.828 2.828 0 0 1 4 4L7 21H3v-4L17 3z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => handleExcluirMochila(m.id)}
                                    aria-label={`Excluir mochila ${m.titulo}`}
                                    className="icone-acao"
                                    type="button"
                                    title="Excluir mochila"
                                    style={{ background: 'none', border: 'none', padding: 0 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-trash-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                </button>
                            </div>

                            {mochilaExpandidaId === m.id && (
                                <div className="itens-mochila" style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
                                    {m.mochilaItens && m.mochilaItens.length > 0 ? (
                                        <ul>
                                            {m.mochilaItens.map((item) => (
                                                <li
                                                    key={item.id}
                                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                                >
                                                    <span>
                                                        {item.nome} — Quantidade: {item.quantidade}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleExcluirItem(item.id, m.id);
                                                        }}
                                                        style={{ marginLeft: '1rem', cursor: 'pointer' }}
                                                        title="Excluir item"
                                                    >
                                                        ❌
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Nenhum item cadastrado nessa mochila.</p>
                                    )}

                                    <AdicionarItemForm
                                        mochilaId={m.id}
                                        onItemAdicionado={(novoItem) => {
                                            setMochilas((prev) =>
                                                prev.map((moch) =>
                                                    moch.id === m.id
                                                        ? { ...moch, mochilaItens: [...(moch.mochilaItens || []), novoItem] }
                                                        : moch
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Mochilas;
