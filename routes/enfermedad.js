var express = require('express');
var app = express();

var Patologia = require('../models/patologia');
var Categoria = require('../models/categoria');

 

//==========================================
//  Metodo get para obtener los
//  las enfermedad
//==========================================
 
app.get('/',(req, res) => {

    

    Patologia.find({})
        .populate('categoria')
        .exec((err, enfermedad)=>{
            
            if( err ) 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando enfermedades',
                errors: err
                });


                Patologia.count({}, (err, total) => {

                if( err ) 
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error count enfermedades',
                    errors: err
                });
       
                res.status(200).json({
                    ok: true,
                    enfermedad ,
                    
                    total
                });
            });
        }); 

});

app.get('/categoria',(req, res) => {

    

    Categoria.find({})
        .populate('enfermedad')
        .exec((err, categorias)=>{
            if( err ) 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando categorias',
                errors: err
                });


                Categoria.count({}, (err, total) => {

                if( err ) 
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error count categorias',
                    errors: err
                });
                
                res.status(200).json({
                    ok: true,
                    categorias,
                    total
                });
            });
        }); 

});



module.exports= app;