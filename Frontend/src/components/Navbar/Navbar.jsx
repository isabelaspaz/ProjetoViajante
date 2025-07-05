import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu'; // ajuste se o caminho for diferente
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef(null);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/viagens"><img src="/travel.png" alt="Logo" /></Link>
            </div>

            <ul className="navbar-links">
                <li><Link to="/viagens">Viagens</Link></li>
                <li><Link to="/mochilas">Mochilas</Link></li>
                <li><Link to="/despesas">Despesas</Link></li>
            </ul>

            <div
                className="menu-wrapper"
                ref={menuButtonRef}
                style={{ position: 'relative' }}
            >
                <button
                    className="navbar-menu-button"
                    onClick={toggleMenu}
                    aria-label="Abrir menu"
                >
                    ☰
                </button>
                {menuOpen && (
                    <Menu
                        onClose={closeMenu}
                        parentRef={menuButtonRef}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
