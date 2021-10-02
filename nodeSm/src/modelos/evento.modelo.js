'use strict'

const mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var eventoSchema = Schema ({
    title: String, 
    start: String,
    end: String  
})

module.exports = mongoose.model('Evento', eventoSchema); 