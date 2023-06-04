import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';

const Cadastrar = () => {

    const[usuario, setUsuario] = useState();
    const[email, setEmail] = useState();
    const[senha, setSenha] = useState();
    const[confirmarSenha, setConfirmarSenha] = useState();
    const [erroSenha, setErroSenha] = useState(false);
    const [erroUsuario, setErroUsuario] = useState(false);
    const [erroEmail, setErroEmail] = useState(false);
    const[contas, setContas] = useState([]);
    const [contaCriada, setContaCriada] = useState(false);

    const enviarDados = (e) => {
        e.preventDefault();

        if(contas.map(x => x.usuario).includes(usuario)){
            setErroUsuario(true);
        }else if(contas.map(y => y.email).includes(email)){
            setErroEmail(true);
        }else if(senha !== confirmarSenha){
            setErroSenha(true);
        }else{
            const formData = {
                usuario: usuario,
                email: email,
                senha: senha,
            }
            api.post("/contas", formData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
            setContaCriada(true);
        }
    };


    useEffect(() => {
        api.get('contas').then(response => {
            setContas(response.data);
        });
    }, []);

    return (
        
        <div>
            <h2>CADASTRAR</h2>

            <p>Usuário digitado: {usuario}</p>
            <form onSubmit={enviarDados}>
                <div>
                    <label htmlFor="usuario">Usuario:</label>
                    <input type="text" id="usuario" name="name" placeholder="Digite seu usuario" maxLength={20}
                    onChange={(e) => setUsuario (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu email" maxLength={254}
                    onChange={(e) => setEmail (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha" maxLength={128}
                    onChange={(e) => setSenha (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="confirmarSenha">Confirme sua Senha:</label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Confirme sua senha" maxLength={128}
                    onChange={(e) => setConfirmarSenha (e.target.value)} required />
                </div>

                {erroUsuario && <p>Nome de usuário já existe</p>}
                {erroEmail && <p>Email já cadastrado</p>}
                {erroSenha && <p>As senhas não coincidem</p>}
                {contaCriada && <p>Conta criada com sucesso!</p>}

                <div>
                    <input type="submit" value="Cadastrar"/>
                </div>
            </form>

            <h1>Contas</h1>
            <ul className="contas">
                {contas &&
                 contas.map((conta) => (
                    <li key={conta.id}>
                        <p>{conta.usuario}</p>
                        <p>{conta.email}</p>
                        <p>{conta.senha}</p>
                        <Link to={`/conta/${conta.id}`}>Detalhes</Link>
                    </li>
                 ))}
            </ul>
        </div>
    )
};

export default Cadastrar;