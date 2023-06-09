import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";

import './Navbar.css';

const Navbar = () => {

    const [logado, setLogado] = useState("");

    useEffect(() => {
        const usuarioLogado = localStorage.getItem('usuario');
        if (usuarioLogado) {
          const usuarioAchado = JSON.parse(usuarioLogado);
          setLogado(usuarioAchado);
        }
      }, []);
    
    const handleLogout = () => {
        setLogado(undefined);
        localStorage.clear();
      };

    return (
        <nav>

            <div className="logo">
            <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/">
                CODEX
            </NavLink>
            </div>

            <ul className="nav-list">

            {logado ? (
                <li className="user-menu">
                <div className='user-wrap'>
                <div className="user">{logado}</div>
                <div className='user-arrow'></div>
                </div>
                <ul>
                <li className="user-options" onClick={handleLogout}><div>SAIR DA SUA CONTA</div></li>
                </ul></li>) : (<>
                    <li><NavLink
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                    to="/login">
                        LOGIN
                    </NavLink></li>

                    <li><NavLink
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                    to="/cadastrar">
                        CADASTRAR
                    </NavLink></li></>
                    )}

            <li><NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/series">
                SÉRIES
            </NavLink></li>

            <li><NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/streaming">
               SERVIÇOS DE STREAMING
            </NavLink></li>

            <li><input type="text" value="" name="" id="buscar" className="search-bar" /></li>

            </ul>

        </nav>
    );
};

export default Navbar;