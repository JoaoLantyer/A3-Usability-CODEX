import React from "react";
import { useState } from "react";
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './Forms.css';

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erroLogin, setErroLogin] = useState(false);
    const navigate = useNavigate();

    const enviarDados = (e) => {
        e.preventDefault();
        setErroLogin(false);

        const formData = {
            usuario: usuario,
            senha: senha,
          };

          api.post("/login", formData)
          .then((res) => {
            if(res.data.validation){

                localStorage.setItem('usuario', JSON.stringify(usuario));
                console.log(res.data)
                navigate('/')
                window.location.reload(true);

            }else{
                setErroLogin(true);
            }
          })

          .catch((error) => {
            console.error(error);
            setErroLogin(true);
          });
      };

    return (
        <div>
            <div className="container">
            LOGIN
                <form onSubmit={enviarDados}>
                    <div className="data">
                        <label htmlFor="usuario">Usuário:</label>
                        <input type="text" id="usuario" name="usuario" placeholder="Digite seu usuário" maxLength={20}
                        onChange={(e) => setUsuario (e.target.value)} required />
                    </div>
                    <div className="data">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" maxLength={128}
                        onChange={(e) => setSenha (e.target.value)} required />
                    </div>

                    {erroLogin && <p class="failed">Seu login falhou, cheque suas credenciais e tente novamente.</p>}

                    <div className="btn">
                        <div className="inner"></div>
                            <input type="submit" value="LOGIN"/>
                    </div>

                    <div>Ainda não é membro?<Link className="link" to="/cadastrar">Cadastre-se.</Link></div>

                </form>
            </div>


        </div>
    )
};

export default Login;