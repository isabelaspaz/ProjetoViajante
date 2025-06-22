import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Componentes/Login/Login";
import Menu from "./Componentes/Menu/Menu";
import Viagem from "./Componentes/Viagem/Viagem"; // <- Substituído corretamente
import Mochila from "./Componentes/Mochila/Mochila";
import Despesas from "./Componentes/Despesas/Despesas.jsx";
import Configuracoes from "./Componentes/Configuracoes/Configuracoes";

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUsuario={setUsuario} />} />
        <Route path="/menu" element={usuario ? <Menu /> : <Navigate to="/" replace />} />
        <Route path="/viagens" element={usuario ? <Viagem usuario={usuario} /> : <Navigate to="/" replace />} />
        <Route path="/mochila" element={usuario ? <Mochila /> : <Navigate to="/" replace />} />
        <Route path="/despesas" element={usuario ? <Despesas /> : <Navigate to="/" replace />} />
        <Route path="/configuracoes" element={usuario ? <Configuracoes /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
