import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import './Pages.css';
import ApagarSerie from '../components/ApagarSerie';
import EditarSerie from "./EditarSerie";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logado, setLogado] = useState("");

  //TAGS E FILTROS
  const [tags, setTags] = useState([]);
  const [plataformaSelecionada, setPlataformaSelecionada] = useState(null);
  const [filtroAssistido, setFiltroAssistido] = useState(false);
  const [filtroCurtido, setFiltroCurtido] = useState(false);
  const [filtroNaoCurtido, setFiltroNaoCurtido] = useState(false);
  const [filtroWatchlist, setFiltroWatchlist] = useState(false);
  const [filtroTouched, setFiltroTouched] = useState(false);

  //EDIT
  const [serieEditar, setSerieEditar] = useState("");
  const [showEditarSerie, setShowEditarSerie] = useState(false);
  const handleEditarClose = () => setShowEditarSerie(false);
  const handleEditarShow = () => setShowEditarSerie(true);

  //DELETE
  const [serieApagar, setSerieApagar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //PAGINACAO
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
      let filteredSeries = response.data;


      if (plataformaSelecionada) {
        filteredSeries = filteredSeries.filter(serie =>
          parseInt(serie.plataforma) === plataformaSelecionada ||
          parseInt(serie.plataforma2) === plataformaSelecionada ||
          parseInt(serie.plataforma3) === plataformaSelecionada
        );
      }
  
      if (filtroAssistido) {
        filteredSeries = filteredSeries.filter(serie =>
          isTagged(logado, serie, "assistidos", tags)
        );
      }
  
      if (filtroCurtido) {
        filteredSeries = filteredSeries.filter(serie =>
          isTagged(logado, serie, "curtidos", tags)
        );
      }
  
      if (filtroNaoCurtido) {
        filteredSeries = filteredSeries.filter(serie =>
          isTagged(logado, serie, "naoCurtidos", tags)
        );
      }
  
      if (filtroWatchlist) {
        filteredSeries = filteredSeries.filter(serie =>
          isTagged(logado, serie, "watchlist", tags)
        );
      }
  
      setSeries(filteredSeries);
    });
  }, [logado, series, plataformas, tags, filtroAssistido, filtroCurtido, filtroNaoCurtido, filtroWatchlist, plataformaSelecionada]);

  useEffect(() => {
    api.get('plataformas').then(response => {
      setPlataformas(response.data);
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

  const handleApagar = async (serieEscolhida) => {
      try {
        notify();
        const resp = await api.delete(`/series/${serieEscolhida.id}`);
        console.log(resp.data);
  
        const updatedSeries = series.filter((x) => x.id !== serieEscolhida.id);
        setSeries(updatedSeries);

      } catch (err) {
        console.error(err);
        notifyErrorGeral();
      }

  };
  
  const handleConfirmacaoApagar = (serieEscolhida) => {
    setSerieApagar(serieEscolhida);
    handleShow();
  };

  const handleEditar = (serieEscolhida) => {
    setSerieEditar(serieEscolhida);
    handleEditarShow();
  };

  const notify = () => {

    toast.success('Série excluída com sucesso!', {
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


  const handleTag = async (serie, nome, usuario) => {
    const tag = tags.find((x) => x.nome === nome && x.serie_id === serie.id);
  
    if (tag !== undefined) { 
      const sendDeleteRequest = async () => {
        try {
          const resp = await api.delete(
            `/tags/nome/${nome}/usuario/${usuario}/serie_id/${serie.id}`
          );
          console.log(resp.data);
      
          const updatedTags = tags.filter(
            (x) => !(x.nome === nome && x.serie_id === serie.id)
          );
          setTags(updatedTags);
      
          const filteredSeries = series.filter((s) => s.id !== serie.id);
          setSeries(filteredSeries);
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
      
          const updatedTags = [...tags, resp.data];
          setTags(updatedTags);
      
          const updatedSeries = [...series, serie];
          setSeries(updatedSeries);
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

  const activeFilters =
  filtroAssistido || filtroCurtido || filtroNaoCurtido || filtroWatchlist || plataformaSelecionada;


  return (
    <div>
      <div className="title-menu">
        <h3>CATÁLOGO DE SÉRIES</h3>

        <div className="submenu">
        {logado === "admin" && (
          <Link className="menu-left" to="/cadastrarserie"><div className="menu-text">ADICIONAR SÉRIE</div></Link>
          )}
          <nav className={filtroTouched ? ("menu-right-open") : ("menu-right")}>
          <div className={activeFilters ? 'filtrado' : 'naoFiltrado'} onTouchStart={() => {setFiltroTouched(!filtroTouched)}}><div className="menu-text">FILTRAR</div></div>
            <ul>
            {logado && (
              <><li className={filtroAssistido ? "checked" : ""} onClick={() => setFiltroAssistido(!filtroAssistido)}>ASSISTIDAS</li>
              <li className={filtroCurtido ? "checked" : ""} onClick={() => setFiltroCurtido(!filtroCurtido)}>CURTIDAS</li>
              <li className={filtroNaoCurtido ? "checked" : ""} onClick={() => setFiltroNaoCurtido(!filtroNaoCurtido)}>NÃO CURTIDAS</li>
              <li className={filtroWatchlist ? "checked" : ""} onClick={() => setFiltroWatchlist(!filtroWatchlist)}>QUERO ASSISTIR</li></>)}
              <li className="available-on">DISPONÍVEIS NA:</li>
              
              {plataformas &&
                 plataformas.map((plataforma) => (
              <li key={plataforma.id} className={plataformaSelecionada === plataforma.id ? "checked" : ""}>
              <li  className={plataformaSelecionada === plataforma.id ? "checked" : ""} onClick={() => setPlataformaSelecionada(prevPlatforma => prevPlatforma === plataforma.id ? null : parseInt(plataforma.id))}>
              {plataforma.nome}</li>
              </li>
              ))}
            </ul>
          </nav>
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
                        onClick={() => handleTag(serie, "assistidos", logado)}></div>
                      <div
                        className={isTagged(logado, serie, "curtidos", tags) ? "taggedCurtir" : "curtir"}
                        onClick={() => handleTag(serie, "curtidos", logado)}></div>
                      <div
                        className={isTagged(logado, serie, "naoCurtidos", tags) ? "taggedNaoCurtir" : "naoCurtir"}
                        onClick={() => handleTag(serie, "naoCurtidos", logado)}></div>
                      <div
                        className={isTagged(logado, serie, "watchlist", tags) ? "taggedWatchlist" : "watchlist"}
                        onClick={() => handleTag(serie, "watchlist", logado)}></div>

                      {logado === "admin" && (
                      <>

                        <div
                          className="editar"
                          onClick={() => handleEditar(serie)}
                        ></div>
                      
                      <div
                          className="apagar"
                          onClick={() => handleConfirmacaoApagar(serie)}>
                          <div id="modal"></div>

                        </div></>)}
                      
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


      <EditarSerie 
      serieEditar={serieEditar}
      showEditarSerie={showEditarSerie}
      handleEditarClose={handleEditarClose}
      />
      
      <ApagarSerie
        showModal={showModal}
        handleClose={handleClose}
        serie={serieApagar}
        handleApagar={handleApagar}
      />

      <footer>
      </footer>
    </div>
  );
};

export default Series;
