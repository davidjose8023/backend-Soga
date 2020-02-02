var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');
var PacienteModel = require('../models/paciente');


// default options
app.use(fileUpload());// midelware necesario

app.put('/:tipo/:id',(req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    var tiposValidos = ['usuarios','hospitales', 'medicos', 'pacientes'];
    if( tiposValidos.indexOf(tipo) < 0 ) 
    return res.status(400).json({
        ok: false,
        mensaje: 'Error en el tipo'
    });

    if( !req.files ) 
    return res.status(400).json({
        ok: false,
        mensaje: 'Error no exite archivo'
    });

    var file = req.files.image;
    var arrFile = file.name.split('.');

    var extension = arrFile[arrFile.length - 1];

    var estensionesValidas = ['jpg', 'png', 'gif', 'jpeg'];

    if(estensionesValidas.indexOf(extension) < 0)// validar extension de la imagen
    return res.status(400).json({
        ok: false,
        mensaje: 'Extensión no valida'
    });


    // Nombre de archivo personalizado
    //8138984482-492324.png
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${ extension }`;


    var path = `./upload/${tipo}/${nombreArchivo}`;
    console.log('tipo::', tipo);
    file.mv(path, function(err) {
        if (err)
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al mover file'
        });
    });
 
    //mover file a una carpeta debe existir en el backend en la capeta upload las subcarpetas
    //usuarios, medicos, hospitales. si genera algun error al subir validar esto

    subirPorTipo(tipo, id, nombreArchivo, res);



});

function subirPorTipo(tipo, id, nombreArchivo, res){

    switch (tipo) {
        case 'usuarios':

            Usuario.findById(id , (err, usuario) => {

                

                if( err ) 
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });

                if( !usuario ) 
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id: '+ id+' no exite',
                    errors: { message : 'No existe un usuario con ese id'}
                });

                var pathViejo = `./upload/usuarios/${usuario.img}`;
                
                //Elimina la img vieja si existe
                if(fs.existsSync(pathViejo)){

                    fs.unlinkSync(pathViejo);
                }

                usuario.img = nombreArchivo;
                
        
                usuario.save( (err, usuarioActualzado) => {
                    
                    if( err ) 
                    return res.status(301).json({
                        ok: false,
                        mensaje: 'Error al actualizar usuario',
                        errors: { message : err}
                    });
        
                    usuarioActualzado.password = ";)";
                    return res.status(200).json({
                        ok: true,
                        usuario:usuarioActualzado
                    });
        
        
                });
        
            });
            
            break;
        case 'medicos':

                Medico.findById(id , (err, medico) => {

                

                    if( err ) 
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar medico',
                        errors: err
                    });
    
                    if( !medico ) 
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El medico con el id: '+ id+' no exite',
                        errors: { message : 'No existe un medico con ese id'}
                    });
    
                    var pathViejo = `./upload/medicos/${medico.img}`;
                    
                    //Elimina la img vieja si existe
                    if(fs.existsSync(pathViejo)){
    
                        fs.unlinkSync(pathViejo);
                    }
                    
                    
            
                    medico.img = nombreArchivo;
                    
            
                    medico.save( (err, medicoActualzado) => {
                        
                        if( err ) 
                        return res.status(301).json({
                            ok: false,
                            mensaje: 'Error al actualizar medico',
                            errors: { message : err}
                        });
            
                        
                        return res.status(200).json({
                            ok: true,
                            medico:medicoActualzado
                        });
            
            
                    });
            
                });
        
            break;

        case 'pacientes':

            PacienteModel.findById(id , (err, paciente) => {

                

                    if( err ) 
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar medico',
                        errors: err
                    });
    
                    if( !paciente ) 
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El paciente con el id: '+ id+' no exite',
                        errors: { message : 'No existe un paciente con ese id'}
                    });
    
                    var pathViejo = `./upload/pacientes/${paciente.img}`;
                    
                    //Elimina la img vieja si existe
                    if(fs.existsSync(pathViejo)){
    
                        fs.unlinkSync(pathViejo);
                    }
                    
                    
            
                    paciente.img = nombreArchivo;
                    
            
                    paciente.save( (err, pacienteActualzado) => {
                        
                        if( err ) 
                        return res.status(301).json({
                            ok: false,
                            mensaje: 'Error al actualizar paciente',
                            errors: { message : err}
                        });
            
                        
                        return res.status(200).json({
                            ok: true,
                            paciente:pacienteActualzado
                        });
            
            
                    });
            
                });
        
            break;
        case 'hospitales':
                Hospital.findById(id , (err, hospital) => {

                    if( err ) 
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar hospital',
                        errors: err
                    });
    
                    if( !hospital ) 
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El hospital con el id: '+ id+' no exite',
                        errors: { message : 'No existe un hospital con ese id'}
                    });
    
                    var pathViejo = `./upload/hospitales/${hospital.img}`;
                    
                    //Elimina la img vieja si existe
                    if(fs.existsSync(pathViejo)){
    
                        fs.unlinkSync(pathViejo);
                    }
                    
                    
            
                    hospital.img = nombreArchivo;
                    
            
                    hospital.save( (err, hospitalActualzado) => {
                        
                        if( err ) 
                        return res.status(301).json({
                            ok: false,
                            mensaje: 'Error al actualizar hospital',
                            errors: { message : err}
                        });
            
        
                        return res.status(200).json({
                            ok: true,
                            hospital:hospitalActualzado
                        });
            
            
                    });
            
                });
        
        break;
      
        default:
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error no se encontro el tipo'
                });
            break;
    }
}

module.exports= app;