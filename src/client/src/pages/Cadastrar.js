import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';
import './Forms.css';

const Cadastrar = () => {

    const[usuario, setUsuario] = useState();
    const[email, setEmail] = useState();
    const[senha, setSenha] = useState();
    const[confirmarSenha, setConfirmarSenha] = useState();
    const[erroSenha, setErroSenha] = useState(false);
    const[erroUsuario, setErroUsuario] = useState(false);
    const[erroEmail, setErroEmail] = useState(false);
    const[contaCriada, setContaCriada] = useState(false);
    const[contas, setContas] = useState([]);
    const[message, setMessage] = useState('');
    const[loginLink, setLoginLink] = useState('');

    const enviarDados = (e) => {
        e.preventDefault();

        setErroUsuario(false);
        setErroEmail(false);
        setErroSenha(false);
        setContaCriada(false);

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

    useEffect(() => {
        if (erroUsuario) {
            setMessage("Nome de usuário já existe.");
          } else if (erroEmail) {
            setMessage("Email já cadastrado.");
          } else if (erroSenha) {
            setMessage("As senhas não coincidem.");
          } else if (contaCriada) {
            setMessage("Conta criada com sucesso!");
            setLoginLink("faça o login clicando aqui");
          } else {
            setMessage("");
        }
      }, [erroUsuario, erroEmail, erroSenha, contaCriada]);


    

    return (
        
        <div>
            <div className="divisor"></div>
            <div className="container">
                CADASTRAR
                <form onSubmit={enviarDados}>
                    <div className="data">
                        <label htmlFor="usuario">Usuario:</label>
                        <input type="text" id="usuario" name="name" placeholder="Digite seu usuario" maxLength={20}
                        onChange={(e) => setUsuario (e.target.value)} required />
                    </div>
                    <div className="data">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu email" maxLength={254}
                        onChange={(e) => setEmail (e.target.value)} required />
                    </div>
                    <div className="data">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" maxLength={128}
                        onChange={(e) => setSenha (e.target.value)} required />
                    </div>
                    <div className="data">
                        <label htmlFor="confirmarSenha">Confirme sua Senha:</label>
                        <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Confirme sua senha" maxLength={128}
                        onChange={(e) => setConfirmarSenha (e.target.value)} required />
                    </div>

                    <div className="messageContainer">
                    <p className={contaCriada ? "success" : "failed"}>{message} </p> <Link className="link" to="/login">{loginLink}</Link>
                    </div>

                    <div className="btn">
                        <div className="inner"></div>
                        <input type="submit" value="Cadastrar"/>
                    </div>
                </form>

            </div>
            <footer>
            </footer>
        </div>
    )
};

export default Cadastrar;