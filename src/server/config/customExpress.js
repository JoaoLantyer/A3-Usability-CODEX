const express = require('express');
const consign = require('consign');
const cors = require('cors');

module.exports = () => {
    const app = express();

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(express.json());

    app.use(cors({
        origin:'*'
    }))

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    consign()
        .include('controllers')
        .into(app);

    return app;
}