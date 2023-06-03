import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
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

            <li><NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/login">
                LOGIN
            </NavLink></li>

            <li><NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/cadastrar">
                CADASTRAR
            </NavLink></li>

            <li><NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/series">
                SERIES
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