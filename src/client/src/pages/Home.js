import React, { useState, useEffect } from "react";
import api from '../api';
import './Pages.css';

const Home = () => {

    const [series, setSeries] = useState([]);

    useEffect(() => {
        api.get('series')
          .then(response => {
            setSeries(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      const seriesFavoritas = series.slice(0, 3);


      return (
        <div>
            <h2>SÉRIES FAVORITAS DO CODEX</h2>

            <div className="imgwrapper">
                {seriesFavoritas.map((serie) => (
                    <div className="home-series" key={serie.id}>
                        <img src={serie.url} alt={serie.title} />
                        <div className="home-bar">
                            <p>{serie.titulo}</p>
                        </div>
                    </div>
                ))}
            </div>
            <footer>
            </footer>
        </div>
    );
};

export default Home;