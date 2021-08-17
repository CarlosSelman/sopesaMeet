'use strict'

//VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")

// IMPORTACION RUTAS
const usuario_ruta = require("./src/rutas/usuario.rutas");
const sala_ruta = require("./src/rutas/sala.rutas");
const tipoSala_ruta = require("./src/rutas/tipoSala.rutas");
const reunion_ruta = require("./src/rutas/reunion.rutas");

// IMPORTACIÓN DEL CONTROLADOR DE USUARIO
const usuario_controlador = require("./src/controladores/usuario.controlador");

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// CABECERAS
app.use(cors());

// CARGA DE RUTAS (ej:  localhost:3000/api/obtenerUsuarios ).
app.use('/api', usuario_ruta,sala_ruta,tipoSala_ruta,reunion_ruta);

//Llamando a la función para crear el usuario al iniciar la aplicación
usuario_controlador.crearUsuarioSuperAdmin(); 

//EXPORTAR
module.exports = app;