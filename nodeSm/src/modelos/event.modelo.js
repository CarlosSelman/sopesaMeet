'use strict'

const mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var eventSchema = Schema ({
      
    nombre: String,
    title: String, 
    start: String,
    end: String,
    cantidadAsist: String,
    estado: String, 
    className: String,
    idResponsable: {type: Schema.Types.ObjectId, ref : 'Usuario'}, //Referencia del usuario que lo creó
    idSala: {type: Schema.Types.ObjectId, ref : 'Sala'}, //Referencia a la sala
    fechaDeGestion: String
    
})

module.exports = mongoose.model('Event', eventSchema);  