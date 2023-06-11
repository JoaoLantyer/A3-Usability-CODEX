import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';
import './Forms.css';

const CadastrarPlataforma = () => {

    //CREATE
  const [nome, setNome] = useState("");
  const [url, setUrl] = useState("");
  const [erroNome, setErroNome] = useState(false);
  const [erroUrl, setErroUrl] = useState(false);
  const [plataformas, setPlataformas] = useState([]);
  const [plataformaCriada, setPlataformaCriada] = useState(false);

  //DELETE
  const [plataformaApagar, setPlataformaApagar] = useState("");
  const [erroApagar, setErroApagar] = useState(false);
  const [plataformaApagada, setPlataformaApagada] = useState(false);

  //EDIT
  const [plataformaEditar, setPlataformaEditar] = useState("");
  const [nomeEditar, setNomeEditar] = useState("");
  const [urlEditar, setUrlEditar] = useState("");
  const [erroEditar, setErroEditar] = useState(false);
  const [erroNomeEditar, setErroNomeEditar] = useState(false);
  const [erroUrlEditar, setErroUrlEditar] = useState(false);
  const [plataformaEditada, setPlataformaEditada] = useState(false);


  const enviarDados = (e) => {
    e.preventDefault();

    if (plataformas.map(x => x.nome).includes(nome)) {
      setErroNome(true);
    } else if (plataformas.map(y => y.url).includes(url)) {
      setErroUrl(true);
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

      setPlataformaCriada(true);
    }
  };

  const handleApagar = (e) => {
    e.preventDefault();
    
    const plataforma = plataformas.find((x) => x.nome === plataformaApagar);
    
    if (plataforma) {
        setPlataformaApagada(true);
        api.delete(`/plataformas/${plataforma.id}`)
        .then(() => {
            setPlataformas((prevPlataformas) => prevPlataformas.filter((x) => x.id !== plataforma.id));
            setPlataformaApagar("");
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

    const plataforma = plataformas.find((x) => x.nome === plataformaEditar);

    if (plataformas.map(x => x.nome).includes(nomeEditar)) {
        setErroNomeEditar(true);
      } else if (plataformas.map(y => y.url).includes(urlEditar)) {
        setErroUrlEditar(true);
      } else {

        if (plataforma) {

            setPlataformaEditada(true);

            const updatedPlataforma = {
            nome: nomeEditar,
            url: urlEditar,
            };

            api.put(`/plataformas/${plataforma.id}`, updatedPlataforma)
            .then(() => {
                setPlataformas((prevPlataformas) =>
                prevPlataformas.map((plataforma) =>
                    plataforma.id === plataforma.id ? updatedPlataforma : plataforma
                )
                );
                setPlataformaEditar("");
                setNomeEditar("");
                setUrlEditar("");
                setPlataformaEditar("");
                setPlataformaEditada(true);
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            setErroEditar(true);
    }}

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

  return (
    <div>

        <div className="container-criar">
        CADASTRAR UMA PLATAFORMA

            <form onSubmit={enviarDados}>
                <div className="data">
                <label htmlFor="nome">Nome da plataforma (sem caracteres especiais):</label>
                <input type="text" id="nome" name="nome" placeholder="Digite o nome da plataforma" maxLength={50} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className="data">
                <label htmlFor="url">URL do seu ícone:</label>
                <input type="url" id="url" name="url" placeholder="Cole a URL do seu ícone" maxLength={2048} onChange={(e) => setUrl(e.target.value)} required />
                </div>

                {erroNome && <p>Nome de plataforma já existe</p>}
                {erroUrl && <p>URL já cadastrado</p>}
                {plataformaCriada && <p>Plataforma criada com sucesso!</p>}

                <div className="btn">
                    <div className="inner"></div>
                <input type="submit" value="Cadastrar" />
                </div>
            </form>
        </div>

        <div className="container-editar">
        EDITAR UMA PLATAFORMA
          <form onSubmit={handleEdit}>

          <div className="data">
              <label htmlFor="plataformaEditar">Nome da plataforma:</label>

              <select id="plataformaEditar" name="plataformaEditar" placeholder="Escolha a plataforma" onChange={(e) => setPlataformaEditar(e.target.value)} required >
              <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>
                 ))}
                </select>
            </div>


            <div className="data">
              <label htmlFor="nomeEditar">Editar Nome (sem caracteres especiais):</label>
              <input type="text" id="nomeEditar" name="nomeEditar" placeholder="Digite o novo nome da plataforma" maxLength={50} value={nomeEditar} onChange={(e) => setNomeEditar(e.target.value)} required />
            </div>
            <div className="data">
              <label htmlFor="urlEditar">Editar URL:</label>
              <input type="url" id="urlEditar" name="urlEditar" placeholder="Cole a nova URL do seu ícone" maxLength={2048} value={urlEditar} onChange={(e) => setUrlEditar(e.target.value)} required />
            </div>
            
            {erroEditar && <p>Plataforma não existente no banco de dados</p>}
            {erroNomeEditar && <p>Nome de plataforma já existe</p>}
            {erroUrlEditar && <p>URL já cadastrado</p>}
            {plataformaEditada && <p>Plataforma editada com sucesso!</p>}

            <div className="btn">
              <div className="inner"></div>
              <input type="submit" value="Editar" />
            </div>
          </form>
      </div>

      <div className="container-apagar">

APAGAR UMA PLATAFORMA

      <form onSubmit={handleApagar}>


      <div className="data">
          <label htmlFor="plataformaApagar">Plataforma a ser apagada:</label>

          <select id="plataformaApagar" name="plataformaApagar" placeholder="Escolha a plataforma que deseja apagar" onChange={(e) => setPlataformaApagar(e.target.value)} required>
              <option value="-">-</option>
                {plataformas &&
                 plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.nome}>{plataforma.nome}</option>
                 ))}
                </select>
          </div>  

          {erroApagar && <p>A Plataforma não existe.</p>}
          {plataformaApagada && <p>A Plataforma foi apagada com sucesso.</p>}   

          <div className="btn">
              <div className="inner"></div>
          <input type="submit" value="Apagar" />
        </div>

      </form>

      </div>

    </div>
  );
};

export default CadastrarPlataforma;