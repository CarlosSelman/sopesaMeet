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
const asitio = 'Asistida';

function obtenerEvents(req, res) {
    eventoModelo.find().populate('idSala', 'nombre').populate('idResponsable', 'usuario rol').exec((err, eventosEncontrados) => {
        console.log(err);
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de reuniones' });
        if (!eventosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener las reuniones' });
        return res.status(200).send({ eventosEncontrados });
    })
}

function obtenerEventsT(req, res) {
    eventoModelo.find((err, eventosEncontrados) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar las reuniones' });
        return res.status(200).send(eventosEncontrados);
    })
}

function obtenerEventsC(req, res) {
    eventoModelo.find({ estado: confirmada }, (err, eventosEncontrados) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar las reuniones' });
        return res.status(200).send(eventosEncontrados);
    })
}

function obtenerEventsAsist(req, res) {
    eventoModelo.find({ estado: asitio }, (err, eventosEncontrados) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar las reuniones' });
        return res.status(200).send(eventosEncontrados);
    })
}

function obtenerEventsP(req, res) {
    eventoModelo.find({ estado: pendiente }, (err, reunionesEncontradas) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar las reuniones' });
        return res.status(200).send(reunionesEncontradas);
    })
}

function obtenerEventsR(req, res) {
    eventoModelo.find({ estado: rechazada }, (err, eventosEncontrados) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar las reuniones' });
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
        eventoModelo.className = pendiente;
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

    eventoModelo.findById(idEvento).populate('idSala idResponsable').exec((err, eventoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la reunión' })
        if (!eventoEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos de la reunión' })
        console.log(eventoEncontrado.title);
        return res.status(200).send({ eventoEncontrado })
    })
}

function confirmarSolicitudEvent(req, res) {

    var idEvento = req.params.idEvento;

    let contador = 0;

    Event.findById(idEvento, (err, eventoEncontrado) => {
        var idSala = eventoEncontrado.idSala;
 
        let fecha_llegar = new Date(eventoEncontrado.start);
        let fecha_salir = new Date(eventoEncontrado.end);

        Event.find({ idSala: idSala, estado: confirmada }, (err, eventosEncontrados) => {
            for (let i = 0; i < eventosEncontrados.length; i++) {
                if (
                    fecha_llegar.toISOString() > eventosEncontrados[i].start && fecha_llegar.toISOString() > eventosEncontrados[i].end ||
                    fecha_llegar.toISOString() < eventosEncontrados[i].start && fecha_salir.toISOString() < eventosEncontrados[i].end
                ) {
                    contador++;
                }
            }
            if (contador == eventosEncontrados.length) {
                Event.findByIdAndUpdate(idEvento, { estado: confirmada, className:confirmada }, { new: true }, (err, solicitudConfirmada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                    if (!solicitudConfirmada) return res.status(500).send({ mensaje: 'No se ha podido cancelar la solicitud de reunión.' });
                    return res.status(200).send({ solicitudConfirmada });
                })
            } else {
                return res.status(500).send({ mensaje: 'Hay interferencia con ese horario' })
            }
        })
    })
}

function cancelarSolicitudEvent(req, res) {
    var idEvento = req.params.idEvento;
    var estado = req.params.estado;
    var eventoModelo = new Event();
    eventoModelo.estado = rechazada;
    eventoModelo.className = rechazada;

    Event.findByIdAndUpdate(idEvento, { estado: rechazada, className: rechazada}, { new: true }, (err, solicitudCancelada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!solicitudCancelada) return res.status(500).send({ mensaje: 'No se ha podido cancelar la solicitud de reunión.' });
        return res.status(200).send({ solicitudCancelada });
    })
}

function pendienteSolicitudEvent(req, res) {
    var idEvento = req.params.idEvento;
    var estado = req.params.estado;
    var eventoModelo = new Event();
    eventoModelo.estado = pendiente;
    eventoModelo.className = pendiente;

    Event.findByIdAndUpdate(idEvento, { estado: pendiente, className: pendiente }, { new: true }, (err, solicitudPendiente) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!solicitudPendiente) return res.status(500).send({ mensaje: 'No se ha podido poner en pendiente la solicitud de reunión.' });
        return res.status(200).send({ solicitudPendiente });
    })
}

function editarSolicitudEvent(req, res) {
    var idEvento = req.params.idEvento;
    var params = req.body;

    eventoModelo.findByIdAndUpdate(idEvento, params, { new: true }, (err, solicitudActualizada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!solicitudActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la solicitud de reunión.' });
        return res.status(200).send({ solicitudActualizada });
    })
}

function obtenerEventsSala(req, res) {
    var idSala = req.params.idSala;
    Event.find({ idSala: idSala, estado: confirmada}, (err, reunionesObtenidas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones' });
        return res.status(200).send({ reunionesObtenidas });
    })
}

function obtenerEventsSalaAsist(req, res) {
    var idSala = req.params.idSala;
    Event.find({ idSala: idSala, estado: asitio}, (err, reunionesObtenidas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones' });
        return res.status(200).send({ reunionesObtenidas });
    })
}

function obtenerEventsSalaRech(req, res) {
    var idSala = req.params.idSala;
    Event.find({ idSala: idSala, estado: rechazada}, (err, reunionesObtenidas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones' });
        return res.status(200).send({ reunionesObtenidas });
    })
}

function obtenerEventsSalaPen(req, res) {
    var idSala = req.params.idSala;
    Event.find({ idSala: idSala, estado: pendiente}, (err, reunionesObtenidas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones' });
        return res.status(200).send({ reunionesObtenidas });
    })
}

function obtenerEventsSalaAsistCal(req, res) {
    var idSala = req.params.idSala;
    Event.find({ idSala: idSala }, (err, reunionesObtenidas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones' });
        return res.status(200).send({ reunionesObtenidas });
    })
}

function obtenerEventsUsuario(req, res) {
    var idResponsable = req.params.idResponsable
    Event.find({ idResponsable: idResponsable }, (err, reunionesObtenidas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones del usuario.' });
        return res.status(200).send({ reunionesObtenidas });
    })
}

function asistenciaEvent(req, res) {
    var idEvento = req.params.idEvento;
    var estado = req.params.estado;
    var eventoModelo = new Event();
    eventoModelo.estado = asitio;
    eventoModelo.className = asitio;

    Event.findByIdAndUpdate(idEvento, { estado: asitio , className: asitio}, { new: true }, (err, solicitudAsistida) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!solicitudAsistida) return res.status(500).send({ mensaje: 'No se ha podido poner en pendiente la solicitud de reunión.' });
        return res.status(200).send({ solicitudAsistida });
    })
}

module.exports = {
    obtenerEvents,
    crearEvent,
    obtenerEvent,
    obtenerEventsT,
    obtenerEventsC,
    obtenerEventsP,
    obtenerEventsR,
    confirmarSolicitudEvent,
    cancelarSolicitudEvent,
    pendienteSolicitudEvent,
    editarSolicitudEvent,
    obtenerEventsSala,
    obtenerEventsUsuario,
    asistenciaEvent,
    obtenerEventsAsist,
    obtenerEventsSalaAsist,
    obtenerEventsSalaAsistCal,
    obtenerEventsSalaRech,
    obtenerEventsSalaPen
}