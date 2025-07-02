import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Cadastro from "./components/Cadastro/Cadastro";
import Login from "./components/Login/Login";
import TelaInicial from "./pages/TelaInicial/TelaInicial";
import Menu from "./components/Menu/Menu"; // Importando o componente Menu
import NovaViagem from "./components/Viagem/NovaViagem";
import Mochilas from "./components/Mochilas/Mochilas"; // Nova Mochila
import Despesas from "./components/Despesas/Despesas"; // Nova Despesa
import Configuracoes from "./components/Configuracoes/Configuracoes"; // Configurações

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota pública */}
                <Route path="/" element={<Homepage />} />

                {/* Rota de Cadastro */}
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Rota de Login */}
                <Route path="/login" element={<Login />} />

                {/* Rota para Tela Inicial */}
                <Route path="/tela-inicial" element={<TelaInicial />} />

                {/* Rota para Nova Viagem */}
                <Route path="/nova-viagem" element={<NovaViagem />} />

                {/* Rota para Nova Mochila */}
                <Route path="/nova-mochila" element={<Mochilas />} />

                {/* Rota para Nova Despesa */}
                <Route path="/nova-despesa" element={<Despesas />} />

                {/* Rota para Configurações */}
                <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
        </Router>
    );
}

export default App;
