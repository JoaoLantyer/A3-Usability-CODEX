import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';
import './Forms.css';

const CadastrarSerie = () => {

    //CREATE
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [plataformas, setPlataformas] = useState([]);
  const [plataforma, setPlataforma] = useState("");
  const [plataforma2, setPlataforma2] = useState("");
  const [plataforma3, setPlataforma3] = useState("");
  const [erroTitulo, setErroTitulo] = useState(false);
  const [erroUrl, setErroUrl] = useState(false);
  const [series, setSeries] = useState([]);
  const [serieCriada, setSerieCriada] = useState(false);

  //DELETE
  const [serieApagar, setSerieApagar] = useState("");
  const [erroApagar, setErroApagar] = useState(false);
  const [serieApagada, setSerieApagada] = useState(false);

  //EDIT
  const [serieEditar, setSerieEditar] = useState("");
  const [tituloEditar, setTituloEditar] = useState("");
  const [urlEditar, setUrlEditar] = useState("");
  const [plataformaEditar, setPlataformaEditar] = useState("");
  const [plataforma2Editar, setPlataforma2Editar] = useState("");
  const [plataforma3Editar, setPlataforma3Editar] = useState("");
  const [erroEditar, setErroEditar] = useState(false);
  const [erroTituloEditar, setErroTituloEditar] = useState(false);
  const [erroUrlEditar, setErroUrlEditar] = useState(false);
  const [serieEditada, setSerieEditada] = useState(false);

  useEffect(() => {
    api.get('plataformas').then(response => {
      setPlataformas(response.data);
    });
  }, []);


  const enviarDados = (e) => {
    e.preventDefault();

    if (series.map(x => x.titulo).includes(titulo)) {
      setErroTitulo(true);
    } else if (series.map(y => y.url).includes(url)) {
      setErroUrl(true);
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

      setSerieCriada(true);
    }
  };

  const handleApagar = (e) => {
    e.preventDefault();
    
    const serie = series.find((x) => x.titulo === serieApagar);
    
    if (serie) {
        setSerieApagada(true);
        api.delete(`/series/${serie.id}`)
        .then(() => {
            setSeries((prevSeries) => prevSeries.filter((x) => x.id !== serie.id));
            setSerieApagar("");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
        setErroApagar(true);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const serie = series.find((x) => x.titulo === serieEditar);

    if (series.map(x => x.titulo).includes(tituloEditar)) {
        setErroTituloEditar(true);
      } else if (series.map(y => y.url).includes(urlEditar)) {
        setErroUrlEditar(true);
      } else {

        if (serie) {

            setSerieEditada(true);

            const updatedSerie = {
            titulo: tituloEditar,
            url: urlEditar,
            plataforma: plataformaEditar,
            plataforma2: plataforma2Editar,
            plataforma3: plataforma3Editar
            };

            api.put(`/series/${serie.id}`, updatedSerie)
            .then(() => {
                setSeries((prevSeries) =>
                prevSeries.map((serie) =>
                    serie.id === serie.id ? updatedSerie : serie
                )
                );
                setSerieEditar("");
                setTituloEditar("");
                setUrlEditar("");
                setPlataformaEditar("");
                setPlataforma2Editar("");
                setPlataforma3Editar("");
                setSerieEditada(true);
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            setErroEditar(true);
    }}

  };

  useEffect(() => {
    api.get('series')
      .then(response => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>

        <div className="container-criar">
        CADASTRAR UMA SÉRIE

            <form onSubmit={enviarDados}>
                <div className="data">
                <label htmlFor="titulo">Titulo (sem caracteres especiais):</label>
                <input type="text" id="titulo" name="name" placeholder="Digite o título da série" maxLength={50} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div className="data">
                <label htmlFor="url">URL do seu pôster:</label>
                <input type="url" id="url" name="url" placeholder="Cole a URL do seu pôster" maxLength={2048} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div className="data">
                <label htmlFor="plataforma">Plataforma onde a série está disponível:</label>
                <select id="plataforma" name="plataforma" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma(e.target.value)} required >
                <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>
                 ))}
                </select>
                </div>
                <div className="data">
                <label htmlFor="plataforma2">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                <select id="plataforma2" name="plataforma2" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma2(e.target.value)} >
                <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>                  
                 ))}
                </select>
                </div>
                <div className="data">
                <label htmlFor="plataforma3">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                <select id="plataforma3" name="plataforma3" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma3(e.target.value)} >
                <option value="-">-</option> 
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>
                 ))}
                </select>
                </div>

                {erroTitulo && <p>Nome de série já existe</p>}
                {erroUrl && <p>URL já cadastrado</p>}
                {serieCriada && <p>Série criada com sucesso!</p>}

                <div className="btn">
                    <div className="inner"></div>
                <input type="submit" value="Cadastrar" />
                </div>
            </form>
        </div>

        <div className="container-editar">
        EDITAR UMA SÉRIE
          <form onSubmit={handleEdit}>

          <div className="data">
              <label htmlFor="serieEditar">Título da série existente:</label>
              <select id="tituloExistente" name="tituloExistente" placeholder="Digite o título da série existente" onChange={(e) => setSerieEditar(e.target.value)} required >
                <option value="-">-</option>
                {series &&
                 series.map((serie) => (
                  <option key={serie.id} value={serie.titulo}>{serie.titulo}</option>
                 ))}
                </select>
            </div>

            <div className="data">
              <label htmlFor="tituloEditar">Editar Título (sem caracteres especiais):</label>
              <input type="text" id="tituloEditar" name="tituloEditar" placeholder="Digite o seu novo título" maxLength={50} value={tituloEditar} onChange={(e) => setTituloEditar(e.target.value)} required />
            </div>
            <div className="data">
              <label htmlFor="urlEditar">Editar URL:</label>
              <input type="url" id="urlEditar" name="urlEditar" placeholder="Digite nova URL do seu pôster" maxLength={2048} value={urlEditar} onChange={(e) => setUrlEditar(e.target.value)} required />
            </div>
            <div className="data">
              <label htmlFor="plataformaEditar">Editar Plataforma:</label>
              <select id="editarPlataforma" name="editarPlataforma" placeholder="Escolha sua plataforma" onChange={(e) => setPlataformaEditar(e.target.value)} required >
              <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>
                 ))}
                </select>
                </div>
                <div className="data">
                <label htmlFor="plataforma2">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                <select id="editarPlataforma2" name="editarPlataforma2" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma2Editar(e.target.value)} >
                <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>                  
                 ))}
                </select>
                </div>
                <div className="data">
                <label htmlFor="plataforma3">Outra plataforma onde a série está disponível (deixe em branco se não houver):</label>
                <select id="editarPlataforma3" name="editarPlataforma3" placeholder="Escolha sua plataforma" onChange={(e) => setPlataforma3Editar(e.target.value)} >
                <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>                  
                 ))}
                </select>
                </div>
            
            {erroEditar && <p>Série não existente no banco de dados</p>}
            {erroTituloEditar && <p>Nome de série já existe</p>}
            {erroUrlEditar && <p>URL já cadastrado</p>}
            {serieEditada && <p>Série editada com sucesso!</p>}

            <div className="btn">
              <div className="inner"></div>
              <input type="submit" value="Editar" />
            </div>
          </form>
      </div>


      <div className="container-apagar">

          APAGAR UMA SÉRIE

          <form onSubmit={handleApagar}>


          <div className="data">
          <label htmlFor="serieApagar">Série a ser apagada:</label>
          <select id="serieApagar" name="serieApagar" placeholder="Digite a série que deseja apagar" onChange={(e) => setSerieApagar(e.target.value)} required >
                <option value="-">-</option>
                {series &&
                 series.map((serie) => (
                  <option key={serie.id} value={serie.titulo}>{serie.titulo}</option>
                 ))}
                </select>
                </div>  

          {erroApagar && <p>A Série não existe.</p>}
          {serieApagada && <p>A Série foi apagada com sucesso.</p>}   

          <div className="btn">
              <div className="inner"></div>
          <input type="submit" value="Apagar" />
          </div>

          </form>

          </div>


    </div>
  );
};

export default CadastrarSerie;