'use strict'

// Importaciones
const express = require("express");
const salaControlador = require("../controladores/sala.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.get('/obtenerSalas', authenticated.ensureAuth, salaControlador.obtenerSalas);
    api.get('/obtenerSalasTipo/:idTipoSala', salaControlador.obtenerSalasTipo);
    api.get('/obtenerSalasTipoSuper/:idTipoSala', salaControlador.obtenerSalasTipoSuper);
    api.post('/crearSala', authenticated.ensureAuth, salaControlador.crearSala);
    api.get('/obtenerSala/:idSala', salaControlador.obtenerSala);
    api.put('/editarSala/:idSala', authenticated.ensureAuth, salaControlador.editarSala);
    api.delete('/eliminarSala/:idSala', authenticated.ensureAuth, salaControlador.eliminarSala);
    api.put('/activarSala/:idSala', salaControlador.activarSala);
    api.put('/desactivarSala/:idSala', salaControlador.desactivarSala);
    
module.exports = api;

