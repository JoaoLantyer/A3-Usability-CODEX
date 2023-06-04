import React from "react";
import { useState } from "react";
import api from '../api';
import { useNavigate } from 'react-router-dom';

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

                localStorage.setItem('usuario', JSON.stringify(res.data))
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
            <h2>LOGIN</h2>

            <p>Usuário digitado: {usuario}</p>
            <form onSubmit={enviarDados}>
                <div>
                    <label htmlFor="usuario">Usuário:</label>
                    <input type="text" id="usuario" name="name" placeholder="Digite seu usuário" maxLength={20}
                    onChange={(e) => setUsuario (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha" maxLength={128}
                    onChange={(e) => setSenha (e.target.value)} required />
                </div>

                {erroLogin && <p>Seu login falhou, cheque suas credenciais e tente novamente.</p>}

                <div>
                    <input type="submit" value="LOGIN"/>
                </div>
            </form> 


        </div>
    )
};

export default Login;