import React, { useState, useEffect } from "react";
import api from '../api';
import { toast } from 'react-toastify';

import './Forms.css';
import 'react-toastify/dist/ReactToastify.css';

const EditarSerie = ({ serieEditar, showEditarSerie, handleEditarClose }) => {

  const [plataformas, setPlataformas] = useState([]);
  const [series, setSeries] = useState([]);
  const [tituloEditar, setTituloEditar] = useState("");
  const [urlEditar, setUrlEditar] = useState("");
  const [plataformaEditar, setPlataformaEditar] = useState("");
  const [plataforma2Editar, setPlataforma2Editar] = useState("");
  const [plataforma3Editar, setPlataforma3Editar] = useState("");
  

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

  const handleEdit = (e) => {
    e.preventDefault();

    const serie = series.find((x) => x.id === serieEditar.id);

    if (series.map(x => x.titulo).includes(tituloEditar)) {
        notifyErrorTitulo();
      } else if (series.map(y => y.url).includes(urlEditar)) { 
        notifyErrorUrl();
      } else {

        if (serie) {

            let updatedSerie;
              if (tituloEditar !== "" && urlEditar !== "") {
                updatedSerie = {
                  titulo: tituloEditar,
                  url: urlEditar,
                  plataforma: plataformaEditar,
                  plataforma2: plataforma2Editar,
                  plataforma3: plataforma3Editar,
                };
              } else if (tituloEditar === "" && urlEditar !== "") {
                updatedSerie = {
                  titulo: serie.titulo,
                  url: urlEditar,
                  plataforma: plataformaEditar,
                  plataforma2: plataforma2Editar,
                  plataforma3: plataforma3Editar,
                };
              } else if (tituloEditar !== "" && urlEditar === "") {
                updatedSerie = {
                  titulo: tituloEditar,
                  url: serie.url,
                  plataforma: plataformaEditar,
                  plataforma2: plataforma2Editar,
                  plataforma3: plataforma3Editar,
                };
              } else {
                updatedSerie = {
                  titulo: serie.titulo,
                  url: serie.url,
                  plataforma: plataformaEditar,
                  plataforma2: plataforma2Editar,
                  plataforma3: plataforma3Editar,
                };
              }

            api.put(`/series/${serie.id}`, updatedSerie)
            .then(() => {
                setSeries((prevSeries) =>
                prevSeries.map((prevSeries) =>
                    prevSeries.id === serie.id ? updatedSerie : serie
                )
                );
                setTituloEditar("");
                setUrlEditar("");
                setPlataformaEditar("");
                setPlataforma2Editar("");
                setPlataforma3Editar("");
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

    toast.success('Série editada com sucesso!', {
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

      <div className={`modal ${showEditarSerie ? 'show' : ''}`}>

          <div className="container-editar"> 
          EDITAR {serieEditar.titulo}
          <button type="button" className="close" onClick={handleEditarClose}>
              <span>&times;</span>
            </button>
            <form onSubmit={handleEdit}>

              <div className="data">
                <label htmlFor="tituloEditar">Editar título da série (sem caracteres especiais):</label>
                <input type="text" id="tituloEditar" name="tituloEditar" placeholder="Digite o seu novo título" maxLength={50} value={tituloEditar} onChange={(e) => setTituloEditar(e.target.value)} />
              </div>
              <div className="data">
                <label htmlFor="urlEditar">Editar URL do pôster:</label>
                <input type="url" id="urlEditar" name="urlEditar" placeholder="Digite nova URL do seu pôster" maxLength={2048} value={urlEditar} onChange={(e) => setUrlEditar(e.target.value)} />
              </div>
              <div className="data">
                <label htmlFor="plataformaEditar">Editar plataforma onde a série está disponível:</label>
                <select id="editarPlataforma" name="editarPlataforma" placeholder="Escolha sua plataforma" onChange={(e) => setPlataformaEditar(e.target.value)} required >
                <option value="-">-</option>
                  {plataformas &&
                  plataformas.map((plataforma) => (
                    <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>
                  ))}
                  </select>
                  </div>
                  <div className="data">
                  <label htmlFor="plataforma2">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                  <select id="editarPlataforma2" name="editarPlataforma2" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma2Editar(e.target.value)} >
                  <option value="-">-</option>
                  {plataformas &&
                  plataformas.map((plataforma) => (
                    <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>                  
                  ))}
                  </select>
                  </div>
                  <div className="data">
                  <label htmlFor="plataforma3">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                  <select id="editarPlataforma3" name="editarPlataforma3" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma3Editar(e.target.value)} >
                  <option value="-">-</option>
                  {plataformas &&
                  plataformas.map((plataforma) => (
                    <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>                  
                  ))}
                  </select>
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

export default EditarSerie;