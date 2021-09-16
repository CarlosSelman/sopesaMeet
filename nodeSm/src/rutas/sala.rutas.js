'use strict'

// Importaciones
const express = require("express");
const salaControlador = require("../controladores/sala.controlador");
const multer = require("multer");

// MIDDLEWARE
var authenticated = require("../middlewares/authenticated");

//Para las imágenes
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/git/sopesaMeet/nodeSm/static/img')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + (Date.now() + Math.random()) + '.' +extension)
    }
});

const upload = multer({ storage: storage })

// RUTES
var api = express.Router();

    api.get('/obtenerSalas', authenticated.ensureAuth, salaControlador.obtenerSalas);
    api.get('/obtenerSalasT', salaControlador.obtenerSalasT);
    api.get('/obtenerSalasTipo/:idTipoSala', salaControlador.obtenerSalasTipo);
    api.get('/obtenerSalasTipoSuper/:idTipoSala', salaControlador.obtenerSalasTipoSuper);
    api.post('/crearSala', authenticated.ensureAuth, salaControlador.crearSala);
    api.get('/obtenerSala/:idSala', salaControlador.obtenerSala);
    api.put('/editarSala/:idSala', authenticated.ensureAuth, salaControlador.editarSala);
    api.delete('/eliminarSala/:idSala', authenticated.ensureAuth, salaControlador.eliminarSala);
    api.put('/activarSala/:idSala', salaControlador.activarSala);
    api.put('/desactivarSala/:idSala', salaControlador.desactivarSala);
    
    /*api.post('/crearSala',[upload.array("uploaded_file")]
    ,(req, res) => {
      console.log(req.files,req.body);
      let imageUno = req.files[0].path
      let imageDos = req.files[1].path
      let imageTres = req.files[2].path
  });
*/
module.exports = api;

