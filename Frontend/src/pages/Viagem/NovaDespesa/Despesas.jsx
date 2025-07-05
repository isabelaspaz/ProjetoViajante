import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Despesas.css';

const Despesas = () => {
    const [viagens, setViagens] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [viagemSelecionadaId, setViagemSelecionadaId] = useState('');
    const [novaDespesaNome, setNovaDespesaNome] = useState('');
    const [novaDespesaPreco, setNovaDespesaPreco] = useState('');
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    useEffect(() => {
        if (!usuario) return;
        fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`)
            .then(res => res.status === 204 ? [] : res.json())
            .then(data => setViagens(Array.isArray(data) ? data : []))
            .catch(() => toast.error("Erro ao carregar viagens"));
    }, [usuario]);

    useEffect(() => {
        if (!viagemSelecionadaId) {
            setDespesas([]);
            return;
        }
        fetch(`http://localhost:8080/despesa/${viagemSelecionadaId}`)
            .then(res => res.status === 204 ? [] : res.json())
            .then(data => setDespesas(Array.isArray(data) ? data : []))
            .catch(() => toast.error("Erro ao carregar despesas"));
    }, [viagemSelecionadaId]);

    const calcularTotal = () => {
        return despesas.reduce((total, despesa) => total + (despesa.preco || 0), 0);
    };

    const handleAdicionarDespesa = (e) => {
        e.preventDefault();

        if (!novaDespesaNome || !novaDespesaPreco || isNaN(novaDespesaPreco)) {
            toast.error("Preencha nome e valor válido.");
            return;
        }

        const nova = {
            nome: novaDespesaNome,
            preco: Number(novaDespesaPreco),
            usuario: { id: usuario.id },
            viagem: { id: Number(viagemSelecionadaId) }
        };

        fetch("http://localhost:8080/despesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nova)
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                toast.success("Despesa adicionada!");
                setDespesas(prev => [...prev, data]);
                setNovaDespesaNome('');
                setNovaDespesaPreco('');
            })
            .catch(() => toast.error("Erro ao adicionar despesa."));
    };

    const handleExcluirDespesa = (id) => {
        if (!window.confirm("Deseja excluir esta despesa?")) return;

        fetch(`http://localhost:8080/despesa/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error();
                setDespesas(prev => prev.filter(d => d.id !== id));
                toast.success("Despesa excluída.");
            })
            .catch(() => toast.error("Erro ao excluir despesa."));
    };

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '1rem' }}>
            <ToastContainer position="top-center" autoClose={3000} />
            <h2 className="titulo-principal">Despesas</h2>

            <label>
                Selecione uma viagem:
                <select
                    value={viagemSelecionadaId}
                    onChange={e => setViagemSelecionadaId(e.target.value)}
                    style={{ display: 'block', margin: '1rem 0', padding: '0.5rem', width: '100%' }}
                >
                    <option value="">-- Escolha uma viagem --</option>
                    {viagens.map(v => (
                        <option key={v.id} value={v.id}>{v.titulo}</option>
                    ))}
                </select>
            </label>

            {viagemSelecionadaId && (
                <>
                    <form onSubmit={handleAdicionarDespesa} className="form-viagem">
                        <input
                            type="text"
                            placeholder="Nome da despesa"
                            value={novaDespesaNome}
                            onChange={e => setNovaDespesaNome(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Valor"
                            value={novaDespesaPreco}
                            onChange={e => setNovaDespesaPreco(e.target.value)}
                        />
                        <button type="submit">Adicionar</button>
                    </form>

                    <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>

                    {despesas.length === 0 ? (
                        <p>Nenhuma despesa encontrada.</p>
                    ) : (
                        <ul className="lista-despesas">
                            {despesas.map(d => (
                                <li key={d.id} className="despesa-item">
                                    <span>{d.nome} — R$ {d.preco.toFixed(2)}</span>
                                    <button onClick={() => handleExcluirDespesa(d.id)}>Excluir</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default Despesas;
