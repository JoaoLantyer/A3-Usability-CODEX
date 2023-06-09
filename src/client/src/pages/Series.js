import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';
import './Pages.css';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logado, setLogado] = useState("");
  const [tags, setTags] = useState([]);
  const pageSize = 2;

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      const usuarioAchado = JSON.parse(usuarioLogado);
      setLogado(usuarioAchado);
  }
    
  }, []);

  useEffect(() => {
    api.get('series').then(response => {
      setSeries(response.data);
    });
  }, []);

  useEffect(() => {
    if (logado) {
      api.get('tags').then(response => {
        const filteredTags = response.data.filter(tag => tag.usuario === logado);
      setTags(filteredTags);
      });
    }
  }, [logado, tags]);


  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      const chunk = arr.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  };

  const seriesChunks = chunkArray(series, 6);
  const totalPages = Math.ceil(seriesChunks.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const NextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const PreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const displayedChunks = seriesChunks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleTag = async (serie, nome, usuario) => {
    const tag = tags.find((x) => x.nome === nome && x.serie_id === serie.id);
  
    if (tag !== undefined) {
      const sendDeleteRequest = async () => {
        try {
          const resp = await api.delete(`/tags/nome/${nome}/usuario/${usuario}/serie_id/${serie.id}`);
          console.log(resp.data);
          
          setTags(prevTags => prevTags.filter((x) => !(x.nome === nome && x.serie_id === serie.id)));
        } catch (err) {
          console.error(err);
        }
      };
  
      await sendDeleteRequest();
    } else {
      const formData = {
        nome: nome,
        usuario: usuario,
        serie_id: serie.id,
      };
  
      const sendPostRequest = async () => {
        try {
          const resp = await api.post("/tags", formData);
          console.log(resp.data);
          
          setTags(prevTags => [...prevTags, resp.data]);
        } catch (err) {
          console.error(err);
        }
      };
  
      await sendPostRequest();
    }
  };
  

  const isTagged = (usuario, serie, tagName, tags) => {
    return tags.some((tag) => tag.nome === tagName && tag.serie_id === serie.id && tag.usuario === usuario);
  };

  return (
    <div>
      <div className="title-menu">
        <h3>CATÁLOGO DE SÉRIES</h3>

        <div className="submenu">
          <Link className="menu-left" to="/cadastrarserie">EDITAR CATÁLOGO</Link>
        </div>

      </div>

      <div className="imgwrapper">
        {displayedChunks.map((chunk, index) => (
          <ul className="catalog-series" key={index}>
            {chunk.map(serie => {
              return (
                <li key={serie.id}>
                  <img src={serie.url} alt={serie.titulo} />
                  {logado ? (
                    <div className={"status-bar"}>
                      <div
                        className={isTagged(logado, serie, "assistidos", tags) ? "taggedAssistido" : "assistido"}
                        onClick={() => handleTag(serie, "assistidos", logado)}
                      ></div>
                      <div
                        className={isTagged(logado, serie, "curtidos", tags) ? "taggedCurtir" : "curtir"}
                        onClick={() => handleTag(serie, "curtidos", logado)}
                      ></div>
                      <div
                        className={isTagged(logado, serie, "naoCurtidos", tags) ? "taggedNaoCurtir" : "naoCurtir"}
                        onClick={() => handleTag(serie, "naoCurtidos", logado)}
                      ></div>
                      <div
                        className={isTagged(logado, serie, "watchlist", tags) ? "taggedWatchlist" : "watchlist"}
                        onClick={() => handleTag(serie, "watchlist", logado)}
                      ></div>
                    </div>
                  ) : (<div></div>)}
                </li>
              );
            })}
          </ul>
        ))}


          <div className="page-selector">
            <div className="back" onClick={PreviousPage}> </div><p>{currentPage}/{totalPages}</p><div className="next" onClick={NextPage}></div>
          </div>
      </div>
    </div>
  );
};

export default Series;
