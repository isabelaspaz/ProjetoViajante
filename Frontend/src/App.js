import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Usuario/Login/Login';
import Cadastro from './pages/Usuario/Cadastro/Cadastro';
import Homepage from './pages/Homepage/Homepage';
import TelaInicial from './pages/Viagem/TelaInicial/TelaInicial';




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/telainicial" element={<TelaInicial />} />

      </Routes>
    </Router>
  );
}

export default App;
