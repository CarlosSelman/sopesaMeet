'use strict'

// Importaciones
const express = require("express");
const eventControlador = require("../controladores/event.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.get('/obtenerEvents', eventControlador.obtenerEvents);
    api.get('/obtenerEvent/:idEvento', eventControlador.obtenerEvent);
    api.post('/crearEvent',authenticated.ensureAuth,  eventControlador.crearEvent);
    
module.exports = api; 