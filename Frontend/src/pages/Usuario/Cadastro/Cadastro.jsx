import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cadastro.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/usuario', {
                nome,
                email,
                senha
            });

            toast.success('Cadastro realizado com sucesso!');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            toast.error('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="page-wrapper">
            <div className="cadastro-container">
                <h2>Cadastro</h2>
                <form onSubmit={handleCadastro}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            placeholder="Digite seu nome"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Digite seu email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button type="submit" className="btn-cadastrar">Cadastrar</button>
                </form>

                <p className="cadastro-login-link">
                    Já é cadastrado?{' '}
                    <Link to="/login">
                        Logar
                    </Link>
                </p>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default Cadastro;
