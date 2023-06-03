import React from "react";

const Streaming = () => {
    return (
        <div>
            
            <div className="title-menu">

                <h3>PLATAFORMAS DE STREAMING</h3>

            </div>

            <div className= "imgwrapper">

                <ul className="catalog-streaming">

                    <li><img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png" alt="Netflix" />
                    <div className="status-bar"></div></li>


                    <li><img src="https://i0.wp.com/cloud.estacaonerd.com/wp-content/uploads/2020/10/12194108/Amazon-Prime.png?resize=512%2C512&ssl=1" alt="Prime Video" />
                    <div className="status-bar"></div></li>


                </ul>

                <ul className="catalog-streaming">

                    <li><img src="https://static-assets.bamgrid.com/product/disneyplus/images/share-default.14fadd993578b9916f855cebafb71e62.png" alt="Disney Plus" />
                    <div className="status-bar"></div></li>
                   

                    <li><img src="https://static.wikia.nocookie.net/hbo-max/images/2/28/Mainpage_Logo.png" alt="HBO Max" />
                    <div className="status-bar"></div></li>

                </ul>

                <p className="page-selector">1/1</p>

            </div>

        </div>
    )
};

export default Streaming;