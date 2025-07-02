import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="homepage"

        >
            <div className="overlay">
                <header className="header">
                    <img src="/travel.png" alt="Projeto Viajante" className="logo" />
                    <h1>Projeto Viajante</h1>
                    <p>Planeje sua próxima aventura com facilidade</p>
                </header>

                <div className="actions">
                    <button onClick={() => navigate("/login")}>Entrar</button>
                    <button onClick={() => navigate("/cadastro")}>Criar conta</button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
