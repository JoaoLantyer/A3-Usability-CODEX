import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from '../api';
import './Forms.css';

const CadastrarPlataforma = () => {

  const [logado, setLogado] = useState("");

    //CREATE
  const [nome, setNome] = useState("");
  const [url, setUrl] = useState("");
  const [plataformas, setPlataformas] = useState([]);


  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      const usuarioAchado = JSON.parse(usuarioLogado);
      setLogado(usuarioAchado);
  }
    
  }, []);

  const enviarDados = (e) => {
    e.preventDefault();

    if (plataformas.map(x => x.nome).includes(nome)) {
      notifyErrorNome();
    } else if (plataformas.map(y => y.url).includes(url)) {
      notifyErrorUrl();
    } else {
      const formData = {
        nome: nome,
        url: url,
      };

      api.post("/plataformas", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
        notify();
        clearForm();
    }
  };


  useEffect(() => {
    api.get('plataformas')
      .then(response => {
        setPlataformas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const clearForm = () => {
    setNome("");
    setUrl("");
  };

  const notify = () => {

    toast.success('Plataforma criada com sucesso!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  };

  const notifyErrorNome = () => {

    toast.error('Nome da plataforma já existe.', {
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

  const notifyErrorUrl = () => {

    toast.error('URL ja cadastrado.', {
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

    {logado === "admin" && (

    <div>

      <div className="divisor"></div>

        <div className="container-criar">
        CADASTRAR UMA PLATAFORMA

            <form onSubmit={enviarDados}>
                <div className="data">
                <label htmlFor="nome">Nome da plataforma (sem caracteres especiais):</label>
                <input type="text" id="nome" name="nome" placeholder="Digite o nome da plataforma" maxLength={50} value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className="data">
                <label htmlFor="url">URL do seu ícone:</label>
                <input type="url" id="url" name="url" placeholder="Cole a URL do seu ícone" maxLength={2048} value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>

                <div className="btn">
                    <div className="inner"></div>
                <input type="submit" value="Cadastrar" />
                </div>
            </form>
        </div>

      <div className="divisor"></div>

      <footer>
      </footer>

      </div>
    )}
    </div>
  );
};

export default CadastrarPlataforma;