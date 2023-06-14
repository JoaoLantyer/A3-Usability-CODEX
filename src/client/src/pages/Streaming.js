import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import './Pages.css';
import ApagarPlataforma from '../components/ApagarPlataforma';
import EditarPlataforma from "./EditarPlataforma";

const Plataformas = () => {
  const [plataformas, setPlataformas] = useState([]);
  const [logado, setLogado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  //EDIT
  const [plataformaEditar, setPlataformaEditar] = useState("");
  const [showEditarPlataforma, setShowEditarPlataforma] = useState(false);
  const handleEditarClose = () => setShowEditarPlataforma(false);
  const handleEditarShow = () => setShowEditarPlataforma(true);

  //DELETE
  const [plataformaApagar, setPlataformaApagar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      const usuarioAchado = JSON.parse(usuarioLogado);
      setLogado(usuarioAchado);
  }
    
  }, []);

  useEffect(() => {
    api.get('plataformas').then(response => {
      setPlataformas(response.data);
    });
  }, [plataformas]);

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

  const handleApagar = async (plataformaEscolhida) => {
    try {
      notify();
      const resp = await api.delete(`/plataformas/${plataformaEscolhida.id}`);
      console.log(resp.data);

      const updatedPlataformas = plataformas.filter((x) => x.id !== plataformaEscolhida.id);
      setPlataformas(updatedPlataformas);

    } catch (err) {
      console.error(err);
      notifyErrorGeral();
    }

};

const handleConfirmacaoApagar = (plataformaEscolhida) => {
  setPlataformaApagar(plataformaEscolhida);
  handleShow();
};

const handleEditar = (plataformaEscolhida) => {
  setPlataformaEditar(plataformaEscolhida);
  handleEditarShow();
};

const notify = () => {

  toast.success('Plataforma excluída com sucesso!', {
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

  return (
    <div>
      <div className="title-menu">
        <h3>PLATAFORMAS DE STREAMING</h3>
        
        <div className="submenu">
        {logado === "admin" && (
          <Link className="menu-left-plat" to="/cadastrarplataforma"><div className="menu-text">ADICIONAR PLATAFORMA</div></Link>
          )}
        </div>
        
      </div>

      <div className="imgwrapper">
        {displayedChunks.map((chunk, index) => (
          <ul className="catalog-streaming" key={index}>
            {chunk.map(plataforma => (
              <li key={plataforma.id}>
                <img src={plataforma.url} alt={plataforma.nome} />
                {logado === "admin" ? (
                    <div className={"status-bar"}>
                      
                        <div
                          className="editar"
                          onClick={() => handleEditar(plataforma)}
                        ></div>
                      
                      <div
                          className="apagar"
                          onClick={() => handleConfirmacaoApagar(plataforma)}>
                          <div id="modal"></div>

                        </div>
                      
                    </div>
                  ) : (<div></div>)}
              </li>
            ))}
          </ul>
        ))}

        <div className="page-selector">
        <div className="back" onClick={PreviousPage}> </div><p>{currentPage}/{totalPages}</p><div className="next" onClick={NextPage}></div>
        </div>
        
      </div>

      <EditarPlataforma 
      plataformaEditar={plataformaEditar}
      showEditarPlataforma={showEditarPlataforma}
      handleEditarClose={handleEditarClose}
      />
      
      <ApagarPlataforma
        showModal={showModal}
        handleClose={handleClose}
        plataforma={plataformaApagar}
        handleApagar={handleApagar}
      />

      <footer>
      </footer>
    </div>
  );
};

export default Plataformas;
