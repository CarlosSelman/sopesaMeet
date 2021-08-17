'use strict'

const mongoose = require('mongoose'); //COnstante que llame al módulo de mongoose 
var Schema = mongoose.Schema; // Variable sobre cómo se va a llamar mi modelo

var reunionSchema = Schema ({
    
    nombre: String,
    descripcion: String, 
    fechaDeReunion: String,
    horaInicio: String, 
    horaFin: String,
    cantidadAsist: String,
    estado: String, 
    idResponsable: {type: Schema.Types.ObjectId, ref : 'Usuario'}, //Referencia del usuario que lo creó
    idSala: {type: Schema.Types.ObjectId, ref : 'Sala'}, //Referencia a la sala
    fechaDeGestion: String
    
})

//Exportando
module.exports = mongoose.model('Reunion', reunionSchema); 