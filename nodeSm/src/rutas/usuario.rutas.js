'use strict'

// Importaciones
const express = require("express");
const usuarioControlador = require("../controladores/usuario.controlador");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.post('/Login', usuarioControlador.Login);
    api.get('/obtenerUsuarios', authenticated.ensureAuth, usuarioControlador.obtenerUsuarios);

module.exports = api;
