import React from 'react';
import './Apagar.css';

const ApagarPlataforma = ({ showModal, handleClose, plataforma, handleApagar }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar exclusão</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Tem certeza que deseja excluir {plataforma.nome}?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => { handleApagar(plataforma); handleClose(); }}>
              APAGAR
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApagarPlataforma;
