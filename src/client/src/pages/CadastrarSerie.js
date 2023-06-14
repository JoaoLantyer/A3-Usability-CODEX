import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

import api from '../api';
import './Forms.css';
import 'react-toastify/dist/ReactToastify.css';

const CadastrarSerie = () => {

  const [logado, setLogado] = useState("");

    //CREATE
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [plataformas, setPlataformas] = useState([]);
  const [plataforma, setPlataforma] = useState("");
  const [plataforma2, setPlataforma2] = useState("");
  const [plataforma3, setPlataforma3] = useState("");
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      const usuarioAchado = JSON.parse(usuarioLogado);
      setLogado(usuarioAchado);
  }
    
  }, []);

  useEffect(() => {
    api.get('series')
      .then(response => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    api.get('plataformas').then(response => {
      setPlataformas(response.data);
    });
  }, []);


  const enviarDados = (e) => {
    e.preventDefault();

    if (series.map(x => x.titulo).includes(titulo)) {
      notifyErrorTitulo();
    } else if (series.map(y => y.url).includes(url)) {
      notifyErrorUrl();
    } else {
      const formData = {
        titulo: titulo,
        url: url,
        plataforma: plataforma,
        plataforma2: plataforma2,
        plataforma3: plataforma3
      };

      api.post("/series", formData)
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

  const clearForm = () => {
    setTitulo("");
    setUrl("");
    setPlataforma("");
    setPlataforma2("");
    setPlataforma3("");
  };

  const notify = () => {

    toast.success('Série criada com sucesso!', {
      toastId: "123",
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

  const notifyErrorTitulo = () => {

    toast.error('Título da série já existe.', {
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
        CADASTRAR UMA SÉRIE

            <form onSubmit={enviarDados}>
                <div className="data">
                <label htmlFor="titulo">Titulo da série (sem caracteres especiais):</label>
                <input type="text" id="titulo" name="name" placeholder="Digite o título da série" maxLength={50} value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div className="data">
                <label htmlFor="url">URL do seu pôster:</label>
                <input type="url" id="url" name="url" placeholder="Cole o URL do seu pôster" maxLength={2048} value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div className="data">
                <label htmlFor="plataforma">Plataforma onde a série está disponível:</label>
                <select id="plataforma" name="plataforma" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma(e.target.value)} required >
                <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>
                 ))}
                </select>
                </div>
                <div className="data">
                <label htmlFor="plataforma2">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                <select id="plataforma2" name="plataforma2" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma2(e.target.value)} >
                <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>                  
                 ))}
                </select>
                </div>
                <div className="data">
                <label htmlFor="plataforma3">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                <select id="plataforma3" name="plataforma3" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma3(e.target.value)} >
                <option value="-">-</option> 
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>
                 ))}
                </select>
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

export default CadastrarSerie;