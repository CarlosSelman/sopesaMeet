'use strict'

// Importaciones
const express = require("express");
const eventoControlador = require("../controladores/evento.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.get('/obtenerEventos', eventoControlador.obtenerEventos);
    api.get('/obtenerEvento/:idEvento', eventoControlador.obtenerEvento);
    api.post('/crearEvento',authenticated.ensureAuth,  eventoControlador.crearEvento);
    
module.exports = api; 