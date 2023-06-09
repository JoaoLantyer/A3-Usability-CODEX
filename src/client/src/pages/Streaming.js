import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';
import './Pages.css';

const Plataformas = () => {
  const [plataformas, setPlataformas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  useEffect(() => {
    api.get('plataformas').then(response => {
      setPlataformas(response.data);
    });
  }, []);

  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      const chunk = arr.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  };

  const plataformasChunks = chunkArray(plataformas, 6);
  const totalPages = Math.ceil(plataformasChunks.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const NextPage = () => {
    if(currentPage < totalPages){
        handlePageChange(currentPage + 1);
    }
  };

  const PreviousPage = () => {
    if(currentPage > 1){
        handlePageChange(currentPage - 1);
    }
  };

  const displayedChunks = plataformasChunks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div className="title-menu">
        <h3>PLATAFORMAS DE STREAMING</h3>
        
        <div className="submenu">
        <Link className="menu-left" to="/cadastrarplataforma">EDITAR CATÁLOGO</Link>
        </div>
        
      </div>

      <div className="imgwrapper">
        {displayedChunks.map((chunk, index) => (
          <ul className="catalog-streaming" key={index}>
            {chunk.map(plataforma => (
              <li key={plataforma.id}>
                <img src={plataforma.url} alt={plataforma.nome} />
                <div className="status-bar">
                  <div className="favoritar"></div>
                </div>
              </li>
            ))}
          </ul>
        ))}

        <div className="page-selector">
        <div className="back" onClick={PreviousPage}> </div><p>{currentPage}/{totalPages}</p><div className="next" onClick={NextPage}></div>
        </div>
        
      </div>
    </div>
  );
};

export default Plataformas;
