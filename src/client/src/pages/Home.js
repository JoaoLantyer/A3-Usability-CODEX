import React from "react";
import './Pages.css'

const Home = () => {
    return (

        <div>
            <h2>SÉRIES FAVORITAS DO CODEX</h2>

            <div className="imgwrapper">

                <div className="home-series">

                    <img src="https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg" alt="Breaking Bad" />

                    <p>Breaking Bad</p>
                    <p className="like-percentage">99%</p>

                </div>

                <div className="home-series">

                    <img src="https://m.media-amazon.com/images/M/MV5BYzJjZDkxMDgtZDBkNC00ZGJlLTk0NzgtZDhjZGIxZDAzZDY2XkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg" alt="Vox Machina" /> 

                    <p>Vox Machina</p>
                    <p className="like-percentage">97%</p>

                </div>

                <div className="home-series">

                    <img src="https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg" alt="The Office" />

                    <p>The Office</p>
                    <p className="like-percentage">96%</p>

                </div>

            </div>
        </div>

    )
};

export default Home;