'use strict'

// Importaciones
const express = require("express");
const reunionControlador = require("../controladores/reunion.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.get('/obtenerReunionesT', reunionControlador.obtenerReunionesT);
    api.get('/obtenerReuniones', authenticated.ensureAuth, reunionControlador.obtenerReuniones);
    api.post('/crearReunion', authenticated.ensureAuth, reunionControlador.crearReunion);
    api.get('/obtenerReunion/:idReunion', reunionControlador.obtenerReunion);
    api.put('/confirmarSolicitud/:idReunion', reunionControlador.confirmarSolicitud);
    api.put('/cancelarSolicitud/:idReunion', reunionControlador.cancelarSolicitud);
    api.put('/editarSolicitud/:idReunion', authenticated.ensureAuth, reunionControlador.editarSolicitud);
    api.get('/obtenerReunionesSala/:idSala', reunionControlador.obtenerReunionesSala);
    api.get('/obtenerReunionesUsuario/:idResponsable', reunionControlador.obtenerReunionesUsuario);
    
module.exports = api; 