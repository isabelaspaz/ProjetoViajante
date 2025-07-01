// src/pages/Homepage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <button className="btn cadastro" onClick={() => navigate("/cadastro")}>
                Cadastro
            </button>
            <button className="btn login" onClick={() => navigate("/login")}>
                Login
            </button>
        </div>
    );
};

export default Homepage;
