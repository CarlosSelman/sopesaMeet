'use strict'

// Importaciones
const express = require("express");
const TipoSalaControlador = require("../controladores/tipoSala.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();
    api.get('/obtenerTipoSalas', TipoSalaControlador.obtenerTipoSalas);
    api.get('/obtenerTipoSalasA', TipoSalaControlador.obtenerTipoSalasA);
    api.post('/crearTipoSala', authenticated.ensureAuth, TipoSalaControlador.crearTipoSala);
    api.get('/obtenerTipoSala/:idTipoSala', TipoSalaControlador.obtenerTipoSala);
    api.put('/editarTipoSala/:idTipoSala', authenticated.ensureAuth, TipoSalaControlador.editarTipoSala);
    api.delete('/eliminarTipoSala/:idTipoSala', authenticated.ensureAuth, TipoSalaControlador.eliminarTipoSala);
    api.put('/activarTipo/:idTipoSala', TipoSalaControlador.activarTipo);
    api.put('/desactivarTipo/:idTipoSala', TipoSalaControlador.desactivarTipo);
module.exports = api;