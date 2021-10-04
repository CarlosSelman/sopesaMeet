'use strict'

const eventoModelo = require("../modelos/event.modelo");
const Event = require("../modelos/event.modelo");
const jwt = require('../servicios/jwt');
const bcrypt = require("bcrypt-nodejs");
var moment = require('moment');

//Roles
const user = 'Usuario';
const admin = 'Administrador';
const superAdmin = 'SuperAdministrador';

//Estado del usuario y de la sala
const confirmada = 'Confirmada';
const pendiente = 'Pendiente';
const rechazada = 'Rechazada';
const asitio = 'Asistida'

function obtenerEvents(req, res) {
    eventoModelo.find((err, eventosEncontrados) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar los Eventos' });
        return res.status(200).send(eventosEncontrados);
    })
}

function crearEvent(req, res) {
    var eventoModelo = new Event();
    var params = req.body;

    //Para la fecha de gestión
    var todayDate = new Date();
    var actualDate = todayDate.toLocaleDateString();

    if (params.nombre && params.title) {
        eventoModelo.title = params.title;
        eventoModelo.nombre = params.nombre;
        eventoModelo.start = moment(params.start).format('YYYY-MM-DDTHH:mm');
        eventoModelo.end = moment(params.end).format('YYYY-MM-DDTHH:mm');
        eventoModelo.cantidadAsist = params.cantidadAsist;
        eventoModelo.estado = pendiente;
        eventoModelo.idResponsable = req.usuario.sub;
        eventoModelo.idSala = params.idSala;
        eventoModelo.fechaDeGestion = actualDate;
        //Validando que si la fecha y hora de inicio es mayor o igual que la final entonces no procede.
        
        if (eventoModelo.start >= eventoModelo.end) {
            return res.status(500).send({ mensaje: 'La fecha y hora inicial no puede ser mayor o igual a la final.' })
        } 
        
        Event.find({
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

function obtenerEvent(req, res) {
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
    obtenerEvents,
    crearEvent,
    obtenerEvent
}