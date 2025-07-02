import { Link } from "react-router-dom";
import "./Navbar.css"; // Importando o CSS para estilização

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo com link para a tela inicial */}
      <Link to="/tela-inicial" className="navbar-logo">
        <img src="/travel.png" alt="Logo TripApp" className="logo-image" />
      </Link>

      {/* Lista de Links */}
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/nova-viagem" className="navbar-link">
            Nova Viagem
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/nova-mochila" className="navbar-link">
            Nova Mochila
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/nova-despesa" className="navbar-link">
            Nova Despesa
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/configuracoes" className="navbar-link">
            Configurações
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
