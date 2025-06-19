import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Componentes/Login/Login";
import Menu from "./Componentes/Menu/Menu";

function Viagens() {
  return <h2>Bem-vindo às Viagens</h2>;
}
function Mochila() {
  return <h2>Sua Mochila</h2>;
}
function Despesas() {
  return <h2>Controle de Despesas</h2>;
}
function Configuracoes() {
  return <h2>Configurações</h2>;
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
        {/* Se quiser proteger rotas, use lógica condicional */}
        <Route 
          path="/menu" 
          element={usuario ? <Menu /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/viagens" 
          element={usuario ? <Viagens /> : <Navigate to="/" replace />} 
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
        {/* Rota curinga para redirecionar */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
