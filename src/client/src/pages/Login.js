import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import api from '../api';

const Login = () => {

    const[nome, setNome] = useState();
    const[email, setEmail] = useState();
    const[senha, setSenha] = useState();

    const enviarDados = (e) => {
        e.preventDefault();
        console.log(`Usuário ${nome} com email ${email} e senha ${senha}`);
    }

    const[contas, setContas] = useState([]);

    useEffect(() => {
        api.get('contas').then(response => {
            setContas(response.data);
        });
    }, []);

    return (
        <div>
            <h2>LOGIN</h2>

            <p>Nome digitado: {nome}</p>
            <form onSubmit={enviarDados}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="name" placeholder="Digite seu nome"
                    onChange={(e) => setNome (e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" placeholder="Digite seu email"
                    onChange={(e) => setEmail (e.target.value)} />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha"
                    onChange={(e) => setSenha (e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Cadastrar"/>
                </div>
            </form>

            <h1>Contas</h1>
            <ul className="contas">
                {contas &&
                 contas.map((conta) => (
                    <li key={conta.id}>
                        <p>{conta.nome}</p>
                        <p>{conta.email}</p>
                        <p>{conta.senha}</p>
                        <Link to={`/conta/${conta.id}`}>Detalhes</Link>
                    </li>
                 ))}
            </ul>
        </div>
    )
};

export default Login;