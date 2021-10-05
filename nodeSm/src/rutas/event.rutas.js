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
    api.get('/obtenerEventsT', eventControlador.obtenerEventsT);
    api.get('/obtenerEventsC', eventControlador.obtenerEventsC);
    api.put('/pendienteSolicitudEvent/:idEvento', eventControlador.pendienteSolicitudEvent);
    api.put('/asistenciaEvent/:idEvento', eventControlador.asistenciaEvent); 
    api.get('/obtenerEventsP', eventControlador.obtenerEventsP);
    api.get('/obtenerEventsR', eventControlador.obtenerEventsR);
    api.put('/confirmarSolicitudEvent/:idEvento', eventControlador.confirmarSolicitudEvent);
    api.put('/cancelarSolicitudEvent/:idEvento', eventControlador.cancelarSolicitudEvent);
    api.put('/editarSolicitudEvent/:idEvento',authenticated.ensureAuth,  eventControlador.editarSolicitudEvent);
    api.get('/obtenerEventsSala/:idSala', eventControlador.obtenerEventsSala);
    api.get('/obtenerEventsUsuario/:idResponsable', eventControlador.obtenerEventsUsuario);
    
module.exports = api; 