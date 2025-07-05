import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/usuario/login', {
                email,
                senha
            });

            localStorage.setItem('usuarioLogado', JSON.stringify(response.data));

            toast.success('Login realizado com sucesso!');

            if (onLoginSuccess) {
                onLoginSuccess(response.data);
            }

            // Aguarda 2 segundos para o toast ser exibido antes de redirecionar
            setTimeout(() => {
                navigate('/telainicial');
            }, 2000);

        } catch (error) {
            toast.error('Email ou senha inválidos');
        }
    };

    return (
        <div className="page-wrapper">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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

                    <button type="submit" className="btn-login">Entrar</button>
                </form>

                <p className="login-register-link" style={{ marginTop: '1rem' }}>
                    Não tem conta?{' '}
                    <Link to="/cadastro">
                        Cadastre-se
                    </Link>
                </p>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default Login;
