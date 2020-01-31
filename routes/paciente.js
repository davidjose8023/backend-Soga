var express = require('express');
var pacienteApp =  express();
var mdAutenticacion = require('../middelware/autenticacion');

var PacienteModel = require('../models/paciente');


//==========================================
//  Metodo post para ingresar
//  los pacientes
//==========================================
pacienteApp.post('/', mdAutenticacion.verificaToken, (req, resp) => {


    var body = req.body;

    var paciente = new PacienteModel({

        nombre : body.nombre,
        apellido: body.apellido,
        telefono: body.telefono,
        rut: body.rut,
        ec: body.ec,
        email: body.email,
        img: body.img,
        sexo: body.sexo
    });

    paciente.save((error, pacienteGuardado) =>{

        if(error)
        return resp.status(400).json({
            ok: false,
            mensaje: `Ocurrio un error al guardar el paciente ${body.nombre}`,
            errors: error

        });
        return resp.status(200).json({

            ok:true,
            mensaje: `El paciente ${body.nombre} se ha guardado exitosamente`,
            paciente: pacienteGuardado

        });


    });

});

//==========================================
//  Metodo PUT para actualizar
//  los pacientes
//==========================================



pacienteApp.put('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var body = req.body;
    var id = req.params.id;

    PacienteModel.findById(id , (err, pacienteEncontrado) => {


        if(err)
        return resp.status(500).json({
            ok: false,
            mensaje: `Ocurrio un error al buscar el paciente ${body.nombre}`,
            errors: err
        });

        if(!pacienteEncontrado)
        return resp.status(400).json({
            ok: false,
            mensaje: `El paciente ${body.nombre} no exite`,
          
        });
 
        pacienteEncontrado.nombre =  body.nombre;
        pacienteEncontrado.apellido =  body.apellido;
        pacienteEncontrado.telefono = body.telefono;
        pacienteEncontrado.rut = body.rut;
        pacienteEncontrado.ec = body.ec;
        pacienteEncontrado.email = body.email;
        pacienteEncontrado.img = body.img;
        pacienteEncontrado.sexo = body.sexo;

        pacienteEncontrado.save((err, pacienteActualizado) => {

            if(err)
            return resp.status(500).json({
                ok: false,
                mensaje: `Ocurrio un error al actualizar el paciente ${body.nombre}`,
                errors: err
            });

            return resp.status(200).json({
                ok: true,
                paciente:pacienteActualizado,
                mensaje: `Paciente ${body.nombre} actualizado correctamente`
            });

        });


    });


});

//==========================================
//  Metodo delete para eliminar pacientes
//  por id
//==========================================

pacienteApp.delete('/:id',mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    PacienteModel.findByIdAndRemove(id, (err, pacienteBorrado) => {

        if(err)
        return resp.status(500).json({
            ok: false,
            mensaje: 'Ocurrio un error al borrar el paciente',
            errors: err
        });
       
        return resp.status(200).json({
            ok: true,
            mensaje: `Paciente ${pacienteBorrado.nombre} fue eliminado satisfactoriamente`,
            paciente: pacienteBorrado

        });

    });

});

//==========================================
//  Metodo get para obtener los
//  los Pacientes Paginados
//==========================================

pacienteApp.get('/', (req, resp) => {

    var desde = req.query.desde || 0;

    desde = Number(desde);

    PacienteModel.find({})
    .skip(desde)
    .limit(5)
    .exec((err, pacientes) => {

        if(err)
        return resp.status(500).json({
            ok: false,
            mensaje: 'Ocurrio un error al listar los pacientes',
            errors: err
        });
        
        PacienteModel.count({}, (err, total) => {

            if(err)
            return resp.status(500).json({
                ok: false,
                mensaje: 'Ocurrio un error total pacientes',
                errors: err
            });

            return resp.status(200).json({
                ok: true,
                pacientes,
                total
    
            });

        });

        
    });
 

});

//==========================================
//  Metodo get para obtener los
//  paciente por id
//==========================================

pacienteApp.get('/:id', (req, resp) => {

    var id = req.params.id;

    PacienteModel.findById(id, (err, paciente)=>{

        if(err)
        return resp.status(500).json({
            ok: false,
            mensaje: 'Error al buscar el paciente',
            errors: err
        });

        if(!paciente)
        return resp.status(400).json({
            ok: false,
            mensaje:'No exite el paciente' 
        });

        return resp.status(200).json({
            ok: true,
            paciente
        });
    });
});


module.exports= pacienteApp;