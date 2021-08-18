'use strict'

const salaModelo = require("../modelos/sala.modelo");
const Sala = require("../modelos/sala.modelo");
const jwt = require('../servicios/jwt');
const bcrypt = require("bcrypt-nodejs");

//Roles
const user = 'Usuario';
const admin = 'Administrador';
const superAdmin = 'SuperAdministrador';
//Estado del usuario y de la sala
const activo = 'Activo';
const desactivado = 'Desactivado';

function obtenerSalas(req,res){

    salaModelo.find().populate('idTipoSala', 'nombre').exec((err, salasEncontradas)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de salas' });
        if(!salasEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las salas' });
        return res.status(200).send({ salasEncontradas });
    })
}

function crearSala(req,res){
    var salaModelo = new Sala();
    var params = req.body;

    if(req.usuario.rol != superAdmin){
        return res.status(500).send({ mensaje: "Solo el Administrador puede crear salas" })
    }

    if (params.nombre && params.ubicacion) {
        salaModelo.nombre = params.nombre;
        salaModelo.equipoDisponible = params.equipoDisponible;
        salaModelo.ubicacion = params.ubicacion;
        salaModelo.estado = activo;
        salaModelo.idTipoSala = params.idTipoSala;
        salaModelo.imagen = null;

        Sala.find({
            $or: [
                { nombre: salaModelo.nombre },
                { ubicacion: salaModelo.ubicacion }
            ]
        }).exec((err, salasEncontradas) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la sala' })

            if (salasEncontradas && salasEncontradas.length >= 1) {
                return res.status(500).send({ mensaje: 'La sala ya existe' })
            } else {
                salaModelo.save((err, salaGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar la sala' })

                    //Guardando la sala
                    if (salaGuardada) {
                        res.status(200).send(salaGuardada)
                        //Mostrando todos los datos de la sala
                        console.log(params); 
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar la sala' })
                    }
                }) 
            }
        })
    }
}


function obtenerSala(req, res) {
    var idSala = req.params.idSala
    
    salaModelo.findById(idSala, (err, salaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la sala' })
        if (!salaEncontrada) return res.status(500).send({ mensaje: 'Error en obtener los datos de la sala' })
        console.log(salaEncontrada.nombre);
        return res.status(200).send({ salaEncontrada })
    })
}

function editarSala(req, res) {
    var idSala = req.params.idSala;
    var params = req.body;

    if(req.usuario.rol != superAdmin){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarla" })
    }

    salaModelo.findByIdAndUpdate(idSala, params, { new: true }, (err, salaActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!salaActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la sala' });
            return res.status(200).send({ salaActualizada });
    })   
}

function eliminarSala(req, res) {
    const idSala = req.params.idSala;

    if(req.usuario.rol != superAdmin ){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    salaModelo.findByIdAndDelete(idSala, (err, salaEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!salaEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la sala.' });

        return res.status(200).send({ salaEliminada });
    })
}

module.exports = {
    obtenerSalas,
    crearSala,
    obtenerSala,
    editarSala,
    eliminarSala
}