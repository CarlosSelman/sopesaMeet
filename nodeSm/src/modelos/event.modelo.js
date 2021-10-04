'use strict'

const mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var eventSchema = Schema ({
    title: String, 
    start: String,
    end: String  
})

module.exports = mongoose.model('Event', eventSchema);  