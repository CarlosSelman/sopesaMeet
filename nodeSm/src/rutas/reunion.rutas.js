'use strict'

// Importaciones
const express = require("express");
const reunionControlador = require("../controladores/reunion.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.get('/obtenerReuniones', authenticated.ensureAuth, reunionControlador.obtenerReuniones);
    api.post('/crearReunion', authenticated.ensureAuth, reunionControlador.crearReunion);
    api.get('/obtenerReunion/:idReunion', reunionControlador.obtenerReunion);

module.exports = api;