'use strict'

// Importaciones
const express = require("express");
const TipoSalaControlador = require("../controladores/tipoSala.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.get('/obtenerTipoSalas', authenticated.ensureAuth, TipoSalaControlador.obtenerTipoSalas);
    api.post('/crearTipoSala', authenticated.ensureAuth, TipoSalaControlador.crearTipoSala);
    api.get('/obtenerTipoSala/:idTipoSala', TipoSalaControlador.obtenerTipoSala);
    api.put('/editarTipoSala/:idTipoSala', authenticated.ensureAuth, TipoSalaControlador.editarTipoSala);
    api.delete('/eliminarTipoSala/:idTipoSala', authenticated.ensureAuth, TipoSalaControlador.eliminarTipoSala);

module.exports = api;