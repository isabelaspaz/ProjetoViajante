import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
const Menu = () => {
  return (
    <header className="navbar">
      <h2 className="navbar-title">Projeto ProjetoViajante</h2>
      <nav aria-label="Menu principal" className="navbar-menu">
        <ul className="navbar-list">
          <li><Link to="/viagens">Viagens</Link></li>
          <li><Link to="/mochila">Mochila</Link></li>
          <li><Link to="/despesas">Despesas</Link></li>
          <li><Link to="/configuracoes">Configurações</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
