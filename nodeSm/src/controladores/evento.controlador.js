'use strict'

const eventoModelo = require("../modelos/evento.modelo");
const Evento = require("../modelos/evento.modelo");
const jwt = require('../servicios/jwt');
const bcrypt = require("bcrypt-nodejs");

function obtenerEventos(req, res) {
    eventoModelo.find((err, eventosEncontrados) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar los Eventos' });
        return res.status(200).send(eventosEncontrados);
    })
}

function crearEvento(req, res) {
    var eventoModelo = new Evento();
    var params = req.body;

    //Para la fecha de gestión
    var todayDate = new Date();
    var actualDate = todayDate.toLocaleDateString();

    if (params.start && params.title) {
        eventoModelo.title = params.title;
        eventoModelo.start = params.start;
        eventoModelo.end = params.end
        

        //Validando que si la fecha y hora de inicio es mayor o igual que la final entonces no procede.
        
        if (eventoModelo.start >= eventoModelo.end) {
            return res.status(500).send({ mensaje: 'La fecha y hora inicial no puede ser mayor o igual a la final.' })
        }
        
        Evento.find({
            $or: [
                { start: eventoModelo.start },
                { title: eventoModelo.title }
            ]
        }).exec((err, eventosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del evento' })

            /*if (reunionesEncontradas && reunionesEncontradas.length >= 1) {
                return res.status(500).send({ mensaje: 'La reunión ya existe' })
            } */else {
                eventoModelo.save((err, eventoGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el evento' })

                    //Guardando la reunión
                    if (eventoGuardado) {
                        res.status(200).send(eventoGuardado)
                        //Mostrando todos los datos de la reunión
                        console.log(params);
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el evento' })
                    }
                })
            }
        })
    }
}

function obtenerEvento(req, res) {
    var idEvento = req.params.idEvento

    eventoModelo.findById(idEvento).exec((err, eventoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del evento' })
        if (!eventoEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del evento' })
        console.log(eventoEncontrado.title);
        console.log(eventoEncontrado.start);
        console.log(eventoEncontrado.end);
        return res.status(200).send({ eventoEncontrado })
    })
}

module.exports = {
    obtenerEventos,
    crearEvento,
    obtenerEvento
}