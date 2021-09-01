'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Imagen = new Schema({
    fileName: {type: 'string'},
    fileUrl: {type: 'string'},
    uploadDate: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Imagen', Imagen); 