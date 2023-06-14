import React, { useState, useEffect } from "react";
import api from '../api';
import { toast } from 'react-toastify';

import './Forms.css';
import 'react-toastify/dist/ReactToastify.css';

const EditarPlataforma = ({ plataformaEditar, showEditarPlataforma, handleEditarClose }) => {

  const [plataformas, setPlataformas] = useState([]);
  const [nomeEditar, setNomeEditar] = useState("");
  const [urlEditar, setUrlEditar] = useState("");
  

  useEffect(() => {
    api.get('plataformas')
      .then(response => {
        setPlataformas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    const plataforma = plataformas.find((x) => x.id === plataformaEditar.id);

    if (plataformas.map(x => x.nome).includes(nomeEditar)) {
        notifyErrorNome();
      } else if (plataformas.map(y => y.url).includes(urlEditar)) { 
        notifyErrorUrl();
      } else {

        if (plataforma) {

            let updatedPlataforma;
              if (nomeEditar !== "" && urlEditar !== "") {
                updatedPlataforma = {
                  nome: nomeEditar,
                  url: urlEditar,
                };
              } else if (nomeEditar === "" && urlEditar !== "") {
                updatedPlataforma = {
                  nome: plataforma.nome,
                  url: urlEditar,
                };
              } else if (nomeEditar !== "" && urlEditar === "") {
                updatedPlataforma = {
                  nome: nomeEditar,
                  url: plataforma.url,
                };
              } else {
                updatedPlataforma = {
                  nome: plataforma.nome,
                  url: plataforma.url,
                };
              }

            api.put(`/plataformas/${plataforma.id}`, updatedPlataforma)
            .then(() => {
                setPlataformas((prevPlataformas) =>
                prevPlataformas.map((prevPlataformas) =>
                    prevPlataformas.id === plataforma.id ? updatedPlataforma : plataforma
                )
                );
                setNomeEditar("");
                setUrlEditar("");
            })
            .catch((error) => {
                console.error(error);
            });
            notify();
        } else {
          notifyErrorGeral();
    }}

  };

  const notify = () => {

    toast.success('Plataforma editada com sucesso!', {
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

    toast.error('URL já cadastrado.', {
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

  const notifyErrorGeral = () => {

    toast.error('Aconteceu algo de errado, tente novamente.', {
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

      <div className={`modal ${showEditarPlataforma ? 'show' : ''}`}>

          <div className="container-editar"> 
          EDITAR {plataformaEditar.nome}
          <button type="button" className="close" onClick={handleEditarClose}>
              <span>&times;</span>
            </button>
            <form onSubmit={handleEdit}>

              <div className="data">
                <label htmlFor="nomeEditar">Editar nome da plataforma (sem caracteres especiais):</label>
                <input type="text" id="nomeEditar" name="nomeEditar" placeholder="Digite o seu novo nome" maxLength={50} value={nomeEditar} onChange={(e) => setNomeEditar(e.target.value)} />
              </div>
              <div className="data">
                <label htmlFor="urlEditar">Editar URL do pôster:</label>
                <input type="url" id="urlEditar" name="urlEditar" placeholder="Digite nova URL do seu pôster" maxLength={2048} value={urlEditar} onChange={(e) => setUrlEditar(e.target.value)} />
              </div>

              <div className="btn">
                <div className="inner"></div>
                <input type="submit" value="Editar" onClick={() => handleEditarClose()}/>
              </div>
            </form>
        </div>
        </div>

        <div className="divisor"></div>

            <footer>
            </footer>

      
    </div>
  );
};

export default EditarPlataforma;