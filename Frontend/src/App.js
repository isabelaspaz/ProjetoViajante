import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Componentes/Login/Login";
import Menu from "./Componentes/Menu/Menu";
import Viagem from "./Componentes/Viagem/Viagem"; 

function Mochila() {
  return <h2>Sua Mochila</h2>;
}

function Despesas() {
  return <h2>Controle de Despesas</h2>;
}

function Configuracoes() {
  return (
    <div>
      <Menu />
      <h2>Configurações</h2>
    </div>
  );
}

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Login setUsuario={setUsuario} />} 
        />
        <Route 
          path="/menu" 
          element={usuario ? <Menu /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/viagens" 
          element={usuario ? <Viagem usuario={usuario} /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/mochila" 
          element={usuario ? <Mochila /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/despesas" 
          element={usuario ? <Despesas /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/configuracoes" 
          element={usuario ? <Configuracoes /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
