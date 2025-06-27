import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Componentes/Login/Login";
import Menu from "./Componentes/Menu/Menu";
import Viagem from "./Componentes/Viagem/Viagem";
import Mochila from "./Componentes/Mochila/Mochila";
import Despesas from "./Componentes/Despesas/Despesas";
import Configuracoes from "./Componentes/Configuracoes/Configuracoes";
import Cadastro from "./Componentes/Cadastro/Cadastro";

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUsuario={setUsuario} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/menu" element={usuario ? <Menu /> : <Navigate to="/" replace />} />
        <Route path="/viagens" element={usuario ? <Viagem usuario={usuario} /> : <Navigate to="/" replace />} />
        <Route path="/mochila" element={usuario ? <Mochila usuario={usuario} /> : <Navigate to="/" replace />} />
        <Route path="/despesas" element={usuario ? <Despesas usuario={usuario} /> : <Navigate to="/" replace />} />
        
        <Route path="/configuracoes" element={usuario ? <Configuracoes usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
