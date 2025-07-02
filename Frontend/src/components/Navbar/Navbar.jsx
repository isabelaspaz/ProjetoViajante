// src/components/Navbar/Navbar.jsx
import "./Navbar.css";

const Navbar = ({ onNovaViagemClick }) => {
  return (
    <nav className="navbar">
      <a href="/tela-inicial" className="navbar-logo">
        <img src="/travel.png" alt="Logo TripApp" className="logo-image" />
      </a>

      <ul className="navbar-list">
        <li className="navbar-item">
          <button className="navbar-link" onClick={onNovaViagemClick}>
            Nova Viagem
          </button>
        </li>
        <li className="navbar-item">
          <a href="/nova-mochila" className="navbar-link">
            Nova Mochila
          </a>
        </li>
        <li className="navbar-item">
          <a href="/nova-despesa" className="navbar-link">
            Nova Despesa
          </a>
        </li>
        <li className="navbar-item">
          <a href="/configuracoes" className="navbar-link">
            Configurações
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
