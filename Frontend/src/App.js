// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Cadastro from "./components/Cadastro/Cadastro";
import Login from "./components/Login/Login"; // importe o componente Login aqui

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} /> {/* rota do Login */}
            </Routes>
        </Router>
    );
}

export default App;
