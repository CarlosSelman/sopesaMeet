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
const rechazada = 'Rechazada';

function obtenerReuniones(req,res){
    reunionModelo.find().populate('idSala', 'nombre').populate('idResponsable','usuario rol').exec((err, reunionesEncontradas)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de reuniones' });
        if(!reunionesEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las reuniones' });
        return res.status(200).send({ reunionesEncontradas });
    })
}
/*
function obtenerReunionesT(req,res){
    reunionModelo.find().populate('idSala', 'nombre').populate('idResponsable','nombre usuario rol').exec((err, reunionesEncontradas)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de reuniones' });
        if(!reunionesEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las reuniones' });
        return res.status(200).send({ reunionesEncontradas });
    })
}
*/

function obtenerReunionesT(req,res){
    reunionModelo.find((err,reunionesEncontradas)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar las reuniones'});
            return res.status(200).send(reunionesEncontradas);
    })
}

function obtenerReunionesC(req,res){
    reunionModelo.find({estado: confirmada},(err,reunionesEncontradas)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar las reuniones'});
        return res.status(200).send(reunionesEncontradas);
    })
}

function obtenerReunionesP(req,res){
    reunionModelo.find({estado: pendiente},(err,reunionesEncontradas)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar las reuniones'});
        return res.status(200).send(reunionesEncontradas);
    })
}

function obtenerReunionesR(req,res){
    reunionModelo.find({estado: rechazada},(err,reunionesEncontradas)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar las reuniones'});
        return res.status(200).send(reunionesEncontradas);
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
        reunionModelo.start = params.start;
        reunionModelo.end = params.end;
        reunionModelo.cantidadAsist = params.cantidadAsist;
        reunionModelo.estado = pendiente;
        reunionModelo.idResponsable = req.usuario.sub;
        reunionModelo.idSala = params.idSala;
        reunionModelo.fechaDeGestion = actualDate;

        //Validando que si la fecha y hora de inicio es mayor o igual que la final entonces no procede.
        if(reunionModelo.start>=reunionModelo.end){
            return res.status(500).send({ mensaje: 'La fecha y hora inicial no puede ser mayor o igual a la final.' })
        }
        
        Reunion.find({
            $or: [
                { nombre: reunionModelo.nombre },
                { descripcion: reunionModelo.descripcion }
            ]
        }).exec((err, reunionesEncontradas) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la reunión' })

            /*if (reunionesEncontradas && reunionesEncontradas.length >= 1) {
                return res.status(500).send({ mensaje: 'La reunión ya existe' })
            } */else {
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

    reunionModelo.findById(idReunion).populate('idSala idResponsable').exec((err, reunionEncontrada)=>{
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

/*
function confirmarSolicitud(req,res) {

    var idReunion = req.params.idReunion;
    var estado = req.params.estado;
    var reunionModelo = new Reunion();
    reunionModelo.estado = confirmada;
    
    var idSala = req.params.idSala;
    var params = req.body;

    var reunionModelo= new Reunion();

        let start = new Date(params.start);
        let end = new Date(params.end);
        let contador=0;

        reunionModelo.start = start;
        reunionModelo.end = end;
        reunionModelo.idSala = idSala;
     
        Reunion.find({idSala: idSala},(err, reunionEncontrada)=>{
            for (let i = 0; i < reunionEncontrada.length; i++) {
                if(
                    start.getTime()>reunionEncontrada[i].start.getTime() && start.getTime()> reunionEncontrada[i].end.getTime() ||
                    start.getTime()< reunionEncontrada[i].start.getTime() && end.getTime()< reunionEncontrada[i].end.getTime()
                ){  
                contador++;
                }        
            }

        if(contador== reunionEncontrada.length){                    
            Reunion.findByIdAndUpdate(idReunion, {estado: confirmada}, { new: true }, (err, solicitudConfirmada)=>{
                if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if(!solicitudConfirmada) return res.status(500).send({ mensaje: 'No se ha podido cancelar la solicitud de reunión.' });
                return res.status(200).send({ solicitudConfirmada });
            })
        }else{
            return res.status(500).send({mensaje: 'Hay interferencia con ese horario'})
        }
    })
}
*/
function cancelarSolicitud(req, res){
    var idReunion = req.params.idReunion;
    var estado = req.params.estado;
    var reunionModelo = new Reunion();
    reunionModelo.estado = rechazada;

    Reunion.findByIdAndUpdate(idReunion, {estado: rechazada}, { new: true }, (err, solicitudCancelada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!solicitudCancelada) return res.status(500).send({ mensaje: 'No se ha podido cancelar la solicitud de reunión.' });
        return res.status(200).send({ solicitudCancelada });
    })
}

function pendienteSolicitud(req, res){
    var idReunion = req.params.idReunion;
    var estado = req.params.estado;
    var reunionModelo = new Reunion();
    reunionModelo.estado = pendiente;

    Reunion.findByIdAndUpdate(idReunion, {estado: pendiente}, { new: true }, (err, solicitudPendiente)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!solicitudPendiente) return res.status(500).send({ mensaje: 'No se ha podido poner en pendiente la solicitud de reunión.' });
        return res.status(200).send({ solicitudPendiente });
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

function obtenerReunionesSala(req, res){
  Reunion.find({idSala : idSala},(err, reunionesObtenidas)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones' });
        return res.status(200).send({ reunionesObtenidas });
    })
}

function obtenerReunionesUsuario(req, res){
    Reunion.find({idResponsable : idResponsable},(err, reunionesObtenidas)=>{
          if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
          if(!reunionesObtenidas) return res.status(500).send({ mensaje: 'No se han podido traer las reuniones del usuario.' });
          return res.status(200).send({ reunionesObtenidas });
      })
  }

module.exports = {
    obtenerReuniones,
    crearReunion,
    obtenerReunion,
    confirmarSolicitud,
    cancelarSolicitud,
    editarSolicitud,
    obtenerReunionesSala,
    obtenerReunionesUsuario,
    obtenerReunionesT,
    obtenerReunionesC,
    obtenerReunionesP,
    obtenerReunionesR,
    pendienteSolicitud
}