var express = require('express');
var citasApp =  express();
var mdAutenticacion = require('../middelware/autenticacion');

var CitasModel = require('../models/citamedica');
var moment = require('moment');


//==========================================
//  Metodo post para ingresar
//  las citas
//==========================================
citasApp.post('/', mdAutenticacion.verificaToken, (req, resp) => {


    var body = req.body;

    var cita = new CitasModel({

        nombres : body.nombres,
        apellidos: body.apellidos,
        telefono: body.telefono,
        rut: body.rut,
        email: body.email,
        start: body.start,
        end: body.end,
        classname: body.classname,
        medico: body.medico,
        usuario: req.usuario._id,
    });

    cita.save((error, citaGuardada) =>{

        if(error)
        return resp.status(400).json({
            ok: false,
            mensaje: `Ocurrio un error al guardar la cita del paciente ${body.nombres}`,
            errors: error

        });
        return resp.status(200).json({

            ok:true,
            mensaje: `La cita de paciente ${body.nombres} se ha guardado exitosamente`,
            cita: citaGuardada

        });


    });

});

//==========================================
//  Metodo PUT para actualizar
//  los pacientes
//==========================================



citasApp.put('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var body = req.body;
    var id = req.params.id;

    CitasModel.findById(id , (err, pacienteEncontrado) => {


        if(err)
        return resp.status(500).json({
            ok: false,
            mensaje: `Ocurrio un error al buscar el paciente ${body.nombres}`,
            errors: err
        });

        if(!pacienteEncontrado)
        return resp.status(400).json({
            ok: false,
            mensaje: `El paciente ${body.nombre} no exite`,
          
        });
 
        pacienteEncontrado.nombres =  body.nombres;
        pacienteEncontrado.apellidos =  body.apellidos;
        pacienteEncontrado.telefono = body.telefono;
        pacienteEncontrado.rut = body.rut;
        pacienteEncontrado.ec = body.ec;
        pacienteEncontrado.email = body.email;
        pacienteEncontrado.img = body.img;
        pacienteEncontrado.sexo = body.sexo;
        pacienteEncontrado.fecha_nacimiento = body.fecha_nacimiento;
        pacienteEncontrado.patologia = body.patologia;
        pacienteEncontrado.usuario = req.usuario._id;

        pacienteEncontrado.save((err, pacienteActualizado) => {

            if(err)
            return resp.status(500).json({
                ok: false,
                mensaje: `Ocurrio un error al actualizar el paciente ${body.nombres}`,
                errors: err
            });

            return resp.status(200).json({
                ok: true,
                paciente:pacienteActualizado,
                mensaje: `Paciente ${body.nombres} actualizado correctamente`
            });

        });


    });


});

//==========================================
//  Metodo delete para eliminar pacientes
//  por id
//==========================================

citasApp.delete('/:id',mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    CitasModel.findByIdAndRemove(id, (err, pacienteBorrado) => {

        if(err)
        return resp.status(500).json({
            ok: false,
            mensaje: 'Ocurrio un error al borrar el paciente',
            errors: err
        });
       
        return resp.status(200).json({
            ok: true,
            mensaje: `Paciente ${pacienteBorrado.nombres} fue eliminado satisfactoriamente`,
            paciente: pacienteBorrado

        });

    });

});

//==========================================
//  Metodo get para obtener los
//  las citas
//==========================================

citasApp.get('/', (req, resp) => {

 
 
    CitasModel.find({},(err, citas) => {

        if(err)
        return resp.status(500).json({
            ok: false,
            mensaje: 'Ocurrio un error al listar las citas',
            errors: err
        });
        
 
        let array = [];
        citas.forEach((element, index) => {
   

           array.push({

            "_id": element._id,
            "nombres": element.nombres,
            "apellidos": element.apellidos,
            "telefono": element.telefono,
            "rut": element.rut,
            "email": element.email,
            "usuario": element.usuario,
            "medico": element.medico,
            "classname": element.classname?element.classname: 'bg-info' ,
            "start": moment(element.start).utc().format('YYYY-MM-DD HH:mm:ss'),
            "end": moment(element.start).utc().format('YYYY-MM-DD HH:mm:ss')
           });
          
           //console.log(moment(element.start).utc().format('YYYY-MM-DD HH:mm:ss'));
           //console.log(moment(array[index].start).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"));
          
       });
 
       
        return resp.status(200).json({
            ok: true,
            citas :array

        });

        

        
    });
 

});

//==========================================
//  Metodo get para obtener los
//  los Pacientes Paginados
//==========================================

// citasApp.get('/', (req, resp) => {

//     var desde = req.query.desde || 0;

//     desde = Number(desde);

//     CitasModel.find({})
//     .skip(desde)
//     .limit(5)
//     .exec((err, pacientes) => {

//         if(err)
//         return resp.status(500).json({
//             ok: false,
//             mensaje: 'Ocurrio un error al listar los pacientes',
//             errors: err
//         });
        
//         CitasModel.count({}, (err, total) => {

//             if(err)
//             return resp.status(500).json({
//                 ok: false,
//                 mensaje: 'Ocurrio un error total pacientes',
//                 errors: err
//             });

//             return resp.status(200).json({
//                 ok: true,
//                 pacientes,
//                 total
    
//             });

//         });

        
//     });
 

// });

//==========================================
//  Metodo get para obtener los
//  paciente por id
//==========================================

citasApp.get('/:id', (req, resp) => {

    var id = req.params.id;

    CitasModel.findById(id, (err, paciente)=>{

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


module.exports= citasApp;