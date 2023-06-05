import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';

const CadastrarSerie = () => {

    const[titulo, setTitulo] = useState();
    const[url, setUrl] = useState();
    const[plataforma, setPlataforma] = useState();
    const[plataforma2, setPlataforma2] = useState();
    const[plataforma3, setPlataforma3] = useState();
    const [erroTitulo, setErroTitulo] = useState(false);
    const [erroUrl, setErroUrl] = useState(false);
    const[series, setSeries] = useState([]);
    const [serieCriada, setSerieCriada] = useState(false);

    const enviarDados = (e) => {
        e.preventDefault();

        if(series.map(x => x.titulo).includes(titulo)){
            setErroTitulo(true);
        }else if(series.map(y => y.url).includes(url)){
            setErroUrl(true);
        }else{
            const formData = {
                titulo: titulo,
                url: url,
                plataforma: plataforma,
                plataforma2: plataforma2,
                plataforma3: plataforma3
            }
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


    useEffect(() => {
        api.get('series').then(response => {
            setSeries(response.data);
        });
    }, []);

    return (
        
        <div>
            <h2>CADASTRAR SERIE</h2>

            <p>Título digitado: {titulo}</p>
            <form onSubmit={enviarDados}>
                <div>
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" id="titulo" name="name" placeholder="Digite seu titulo" maxLength={20}
                    onChange={(e) => setTitulo (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="url">Url:</label>
                    <input type="url" id="url" name="url" placeholder="Digite seu url" maxLength={254}
                    onChange={(e) => setUrl (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="plataforma">Plataforma:</label>
                    <input type="text" id="plataforma" name="plataforma" placeholder="Digite sua plataforma" maxLength={128}
                    onChange={(e) => setPlataforma (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="plataforma2">Plataforma2:</label>
                    <input type="text" id="plataforma2" name="plataforma2" placeholder="Digite sua plataforma2" maxLength={128}
                    onChange={(e) => setPlataforma2 (e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="plataforma3">Plataforma3:</label>
                    <input type="text" id="plataforma3" name="plataforma3" placeholder="Digite sua plataforma3" maxLength={128}
                    onChange={(e) => setPlataforma3 (e.target.value)} required />
                </div>

                {erroTitulo && <p>Nome de título já existe</p>}
                {erroUrl && <p>Url já cadastrado</p>}
                {serieCriada && <p>Conta criada com sucesso!</p>}

                <div>
                    <input type="submit" value="CadastrarSerie"/>
                </div>
            </form>

            <h1>Series</h1>
            <ul className="series">
                {series &&
                 series.map((serie) => (
                    <li key={serie.id}>
                        <p>{serie.titulo}</p>
                        <p>{serie.url}</p>
                        <p>{serie.plataforma}</p>
                        <p>{serie.plataforma2}</p>
                        <p>{serie.plataforma3}</p>
                        <Link to={`/serie/${serie.id}`}>Detalhes</Link>
                    </li>
                 ))}
            </ul>
        </div>
    )
};

export default CadastrarSerie;