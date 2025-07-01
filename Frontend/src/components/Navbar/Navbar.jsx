import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/menu">
            <button type="button">Menu</button>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/nova-viagem">
            <button type="button">Nova Viagem</button>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/nova-mochila">
            <button type="button">Nova Mochila</button>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/nova-despesa">
            <button type="button">Nova Despesa</button>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/configuracoes">
            <button type="button">Configurações</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
