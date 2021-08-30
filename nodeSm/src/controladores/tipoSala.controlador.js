'use strict'

const tipoSalaModelo = require("../modelos/tipoSala.modelo");
const TipoSala = require("../modelos/tipoSala.modelo");
const jwt = require('../servicios/jwt');
const bcrypt = require("bcrypt-nodejs");

//Roles
const user = 'Usuario';
const admin = 'Administrador';
const superAdmin = 'SuperAdministrador';
//Estado del usuario y de la sala
const activo = 'Activo';
const desactivado = 'Desactivado';

function obtenerTipoSalas(req,res){

    tipoSalaModelo.find((err, tipoSalasEncontrados)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de tipos de salas' });
        if(!tipoSalasEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los tipos de salas' });
        return res.status(200).send({ tipoSalasEncontrados });
    })
}

function crearTipoSala(req,res){
    var tipoSalaModelo = new TipoSala();
    var params = req.body;

    if(req.usuario.rol != superAdmin){
        return res.status(500).send({ mensaje: "Solo el Administrador puede crear los tipos de salas" })
    }

    if (params.nombre && params.descripcion) {
        tipoSalaModelo.nombre = params.nombre;
        tipoSalaModelo.descripcion = params.descripcion;
        tipoSalaModelo.capacidadMax = params.capacidadMax;
        tipoSalaModelo.estado = activo;
    
        TipoSala.find({
            $or: [
                { nombre: tipoSalaModelo.nombre },
                { descripcion: tipoSalaModelo.descripcion }
            ]
        }).exec((err, tipoSalasEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los tipos de sala' })

            if (tipoSalasEncontrados && tipoSalasEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El tipo de sala ya existe' })
            } else {
                tipoSalaModelo.save((err, tipoSalaGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el tipo de sala' })

                    //Guardando el tipo de sala
                    if (tipoSalaGuardado) {
                        res.status(200).send(tipoSalaGuardado)
                        //Mostrando todos los datos del tipo de sala
                        console.log(params); 
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar el tipo de sala' })
                    }
                }) 
            }
        })
    }
}


function obtenerTipoSala(req, res) {
    var idTipoSala = req.params.idTipoSala
    
    tipoSalaModelo.findById(idTipoSala, (err, tipoSalaEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del tipo de sala' })
        if (!tipoSalaEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del tipo de la sala' })
        console.log(tipoSalaEncontrado.nombre);
        return res.status(200).send({ tipoSalaEncontrado })
    })
}

function editarTipoSala(req, res) {
    var idTipoSala = req.params.idTipoSala;
    var params = req.body;

    if(req.usuario.rol != superAdmin){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarla" })
    }

    tipoSalaModelo.findByIdAndUpdate(idTipoSala, params, { new: true }, (err, tipoSalaActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!tipoSalaActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el tipo de sala' });
            return res.status(200).send({ tipoSalaActualizado });
    })   
}

function eliminarTipoSala(req, res) {
    const idTipoSala = req.params.idTipoSala;

    if(req.usuario.rol != superAdmin ){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    tipoSalaModelo.findByIdAndDelete(idTipoSala, (err, tipoSalaEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!tipoSalaEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el tipo de sala.' });

        return res.status(200).send({ tipoSalaEliminado });
    })
}

function activarTipo(req, res){
    var idTipoSala = req.params.idTipoSala;
    var estado = req.params.estado;
    var tipoSalaModelo = new TipoSala();
    tipoSalaModelo.estado = activo;

    TipoSala.findByIdAndUpdate(idTipoSala, {estado: activo}, { new: true }, (err, tipoSalaActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!tipoSalaActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el tipo de sala' });
        
        return res.status(200).send({ tipoSalaActualizado });
    })
}

function desactivarTipo(req, res){
    var idTipoSala = req.params.idTipoSala;
    var estado = req.params.estado;
    var tipoSalaModelo = new TipoSala();
    tipoSalaModelo.estado = activo;

    TipoSala.findByIdAndUpdate(idTipoSala, {estado: desactivado}, { new: true }, (err, tipoSalaActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!tipoSalaActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el tipo de sala' });
        
        return res.status(200).send({ tipoSalaActualizado });
    })
}


module.exports = {
    obtenerTipoSalas,
    crearTipoSala,
    obtenerTipoSala,
    editarTipoSala,
    eliminarTipoSala,
    desactivarTipo,
    activarTipo
}