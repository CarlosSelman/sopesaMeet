'use strict'

const reunionModelo = require("../modelos/reunion.modelo");
const Reunion = require("../modelos/reunion.modelo");
const jwt = require('../servicios/jwt');
const bcrypt = require("bcrypt-nodejs");

//Roles
const user = 'Usuario';
const admin = 'Administrador';
const superAdmin = 'SuperAdministrador';

//Estado del usuario y de la sala
const confirmada = 'Confirmada';
const pendiente = 'Pendiente';
const cancelada = 'Cancelada';

function obtenerReuniones(req,res){
    reunionModelo.find().populate('idSala', 'nombre').populate('idResponsable','usuario rol').exec((err, reunionesEncontradas)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de reuniones' });
        if(!reunionesEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las reuniones' });
        return res.status(200).send({ reunionesEncontradas });
    })
}

function crearReunion(req,res){
    var reunionModelo = new Reunion();
    var params = req.body;

    //Para la fecha de gestión
    var todayDate = new Date();
    var actualDate = todayDate.toLocaleDateString();
    if (params.nombre && params.descripcion) {
        reunionModelo.nombre = params.nombre;
        reunionModelo.descripcion = params.descripcion;
        reunionModelo.fechaDeInicio = params.fechaDeInicio;
        reunionModelo.fechaDeFin = params.fechaDeFin;
        reunionModelo.cantidadAsist = params.cantidadAsist;
        reunionModelo.estado = pendiente;
        reunionModelo.idResponsable = req.usuario.sub;
        reunionModelo.idSala = params.idSala;
        reunionModelo.fechaDeGestion = actualDate;

        //Validando que si la fecha y hora de inicio es mayor o igual que la final entonces no procede.
        if(reunionModelo.fechaDeInicio>=reunionModelo.fechaDeFin){
            return res.status(500).send({ mensaje: 'La fecha y hora inicial no puede ser mayor o igual a la final.' })
        }
        
        Reunion.find({
            $or: [
                { nombre: reunionModelo.nombre },
                { descripcion: reunionModelo.descripcion }
            ]
        }).exec((err, reunionesEncontradas) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la reunión' })

            if (reunionesEncontradas && reunionesEncontradas.length >= 1) {
                return res.status(500).send({ mensaje: 'La reunión ya existe' })
            } else {
                reunionModelo.save((err, reunionGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar la reunión' })

                    //Guardando la reunión
                    if (reunionGuardada) {
                        res.status(200).send(reunionGuardada)
                        //Mostrando todos los datos de la reunión
                        console.log(params); 
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar la reunión' })
                    }
                }) 
            }
        })
    }
}


function obtenerReunion(req, res) {
    var idReunion = req.params.idReunion
    
    reunionModelo.findById(idReunion, (err, reunionEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la reunión' })
        if (!reunionEncontrada) return res.status(500).send({ mensaje: 'Error en obtener los datos de la reunión' })
        console.log(reunionEncontrada.nombre);
        return res.status(200).send({ reunionEncontrada })
    })
}

function confirmarSolicitud(req, res){
    var idReunion = req.params.idReunion;
    var estado = req.params.estado;
    var reunionModelo = new Reunion();
    reunionModelo.estado = confirmada;

    Reunion.findByIdAndUpdate(idReunion, {estado: confirmada}, { new: true }, (err, solicitudConfirmada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!solicitudConfirmada) return res.status(500).send({ mensaje: 'No se ha podido confirmar la solicitud de reunión.' });
        return res.status(200).send({ solicitudConfirmada });
    })
}

function cancelarSolicitud(req, res){
    var idReunion = req.params.idReunion;
    var estado = req.params.estado;
    var reunionModelo = new Reunion();
    reunionModelo.estado = cancelada;

    Reunion.findByIdAndUpdate(idReunion, {estado: cancelada}, { new: true }, (err, solicitudCancelada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!solicitudCancelada) return res.status(500).send({ mensaje: 'No se ha podido cancelar la solicitud de reunión.' });
        return res.status(200).send({ solicitudCancelada });
    })
}

function editarSolicitud(req, res) {
    var idReunion = req.params.idReunion;
    var params = req.body;

    reunionModelo.findByIdAndUpdate(idReunion, params, { new: true }, (err, solicitudActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!solicitudActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la solicitud de reunión.' });
            return res.status(200).send({ solicitudActualizada });
    })   
}

module.exports = {
    obtenerReuniones,
    crearReunion,
    obtenerReunion,
    confirmarSolicitud,
    cancelarSolicitud,
    editarSolicitud
}