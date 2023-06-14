import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './Forms.css';

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const enviarDados = (e) => {
        e.preventDefault();

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
                notifyErrorGeral();
            }
          })

          .catch((error) => {
            console.error(error);
            notifyErrorGeral();
          });
      };
   
      const notifyErrorGeral = () => {
    
        toast.error('Credenciais incorretas, tente novamente.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      };

    return (
        <div>
            <div className="divisor"></div>
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

                    <div className="btn">
                        <div className="inner"></div>
                            <input type="submit" value="LOGIN"/>
                    </div>

                    <div>Ainda não é membro?<Link className="link" to="/cadastrar">Cadastre-se.</Link></div>

                </form>
            </div>

            <footer>
            </footer>

        </div>
    )
};

export default Login;