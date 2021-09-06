'use strict'
const express = require("express");
const Imagen = require('../modelos/imagen');
const storage = require('../configuracion/multer');
const multer = require('multer');
var api = express.Router();

const uploader = multer({
    storage
}).single('file')

api.post('/uploads', uploader, async (req,res) => {
    const { body, file } = req
    if(file && body){
        const newImagen = new Imagen({
            fileName: body.name,
            fileUrl: `http://localhost:3000/${file.filename}`
        })
        await newImagen.save()
        res.json({
            newImagen: newImagen
        })
    }
})

api.get('/download', async (req, res) => {
    const imagenes = await Imagen.find()
    res.json(imagenes)
})

module.exports = api;