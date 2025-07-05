import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Usuario/Login/Login';
import Cadastro from './pages/Usuario/Cadastro/Cadastro';
import Homepage from './pages/Homepage/Homepage';
import TelaInicial from './pages/Viagem/TelaInicial/TelaInicial';
import Viagens from './pages/Viagem/NovaViagem/Viagens';
import Mochilas from './pages/Viagem/NovaMochila/Mochilas';
import Despesas from './pages/Viagem/NovaDespesa/Despesas';

// Este componente precisa estar dentro do <Router> para usar useLocation
console.log({ Homepage, Login, Cadastro, TelaInicial, Viagens, Mochilas, Despesas });
console.log({
  Homepage,
  Login,
  Cadastro,
  TelaInicial,
  Viagens,
  Mochilas,
  Despesas
});


function AppRoutes() {
  const location = useLocation();

  // Esconde a Navbar em determinadas rotas
  const hideNavbarRoutes = ['/', '/login', '/cadastro'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}


      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/telainicial" element={<TelaInicial />} />
        <Route path="/viagens" element={<Viagens />} />
        <Route path="/mochilas" element={<Mochilas />} />
        <Route path="/despesas" element={<Despesas />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
