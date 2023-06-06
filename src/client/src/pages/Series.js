import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';
import './Pages.css';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  useEffect(() => {
    api.get('series').then(response => {
      setSeries(response.data);
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

  const seriesChunks = chunkArray(series, 6);
  const totalPages = Math.ceil(seriesChunks.length / pageSize);

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

  const displayedChunks = seriesChunks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
            {chunk.map(serie => (
              <li key={serie.id}>
                <img src={serie.url} alt={serie.titulo} />
                <div className="status-bar"></div>
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

export default Series;
