import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = ({ onClose, parentRef }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                parentRef.current &&
                !parentRef.current.contains(event.target) &&
                !event.target.closest('.menu-container')
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, parentRef]);

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogado');
        onClose();
        navigate('/login');
    };

    return (
        <div className="menu-container" aria-label="Menu">
            <Link to="/configuracoes" className="menu-item" onClick={onClose}>
                Configurações
            </Link>
            <button className="menu-item menu-logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Menu;
