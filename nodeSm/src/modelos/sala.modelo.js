'use strict'

const mongoose = require('mongoose'); //COnstante que llame al módulo de mongoose 
var Schema = mongoose.Schema; // Variable sobre cómo se va a llamar mi modelo

var salaSchema = Schema ({

    nombre: String,
    equipoDisponible: String, //Aquí se menciona todo lo que cuanta la sala (TV, Bocinas...).
    ubicacion: String, //Aquí se menciona en qué nivel se encuentra...
    estado: String, //Este estado se trata de la dispnibilidad de uso (si se puede usar o no).
    idTipoSala: {type: Schema.Types.ObjectId, ref : 'TipoSala'} //Referencia del tipo de sala
    
})

//Exportando
module.exports = mongoose.model('Sala', salaSchema);