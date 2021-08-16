'use strict'

const usuarioModelo = require("../modelos/usuario.modelo");
const Usuario = require("../modelos/usuario.modelo");
const jwt = require('../servicios/jwt');
const bcrypt = require("bcrypt-nodejs");

//Roles
const user = 'Usuario';
const admin = 'Administrador';
const superAdmin = 'SuperAdministrador';
//Estado del usuario
const activo = 'Activo';
const desactivado = 'Desactivado';

function crearUsuarioSuperAdmin(req,res) {

    var  usuarioModelo = new Usuario(); 
    usuarioModelo.usuario = 'SuperAdmin';
    usuarioModelo.contrasena = 'SOPESA2021';
    usuarioModelo.rol = superAdmin;
    usuarioModelo.estado = activo;


    Usuario.find({ $or: [
     {usuario: usuarioModelo.usuario}
     ]}).exec((err, usuarioEncontrado)=>{
     if (err) return console.log('Error en la petición')  
     
     if (usuarioEncontrado 
         && usuarioEncontrado.length >=1) {
         return console.log('SOPESA Meet listo')
     }else{
         bcrypt.hash('SOPESA2021',null,null,(err, passwordEncriptada)=>{
            usuarioModelo.contrasena = passwordEncriptada; 
            usuarioModelo.save((err,usuarioGuardado)=>{ 
                 if (err) return console.log('Error al guardar el usuario');
                     
                 if (usuarioGuardado) {
                     return console.log(usuarioGuardado)    
                 }else{
                     return console.log( 'Error al registrar el usuario del SuperAdmin')
                 }
            })
         })
     }
    })
}


function obtenerUsuarios(req,res){
    var validacion = req.usuario.rol;

    if(validacion == superAdmin){
        usuarioModelo.find((err,usuariosEncontrados)=>{
            if(err) return res.status(404).send({report: 'Error al encontrar los usuarios'});
            return res.status(200).send(usuariosEncontrados);
        })
    }else{
        return res.status(404).send({report:"No tienes los permisos necesarios"})
    }
}

function Login(req,res){
    var params = req.body;
    
    usuarioModelo.findOne({ usuario : params.usuario }, (err, usuarioEncontrado)=>{
        if(err) return res.status(404).send({ report: 'Error  al iniciar sesión'});
        if(!usuarioEncontrado) return res.status(404).send({ report: 'El usuario no existe'});

        if(usuarioEncontrado){
            bcrypt.compare(params.contrasena, usuarioEncontrado.contrasena, (err,Valid)=>{
                if(err) return res.status(404).send({ report : 'Error en la contraseña'});
                if(Valid) {
                    return res.status(200).send({ token: jwt.createToken(usuarioEncontrado), usuarioEncontrado}  );
                }else {
                    return res.status(404).send({ report: 'El usuario no es válido'})   
                }
            })
        }
    })

}


module.exports = {
    crearUsuarioSuperAdmin,
    Login,
    obtenerUsuarios
}