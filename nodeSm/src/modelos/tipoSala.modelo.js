'use strict'

const mongoose = require('mongoose'); //COnstante que llame al módulo de mongoose 
var Schema = mongoose.Schema; // Variable sobre cómo se va a llamar mi modelo

var TipoSalaSchema = Schema ({

    nombre: String,
    descripcion: String, //Se mencionan a grandes rasgos algunas características
    capacidadMax: String, //Límite de capacidad
    estado: String //Este estado se trata de la dispnibilidad de uso (si se puede usar o no).
    
})

//Exportando
module.exports = mongoose.model('TipoSala', TipoSalaSchema);