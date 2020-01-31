var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

exports.verificaToken = function (req,res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decode) => {

        if( err ) 
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: err
        });
        req.usuario= decode.usuario;
        next();
    });
}

exports.verificaAdminRole = function (req,res, next) {
    var usuario = req.usuario;
    console.log(usuario);
    if(usuario.role === "ADMIN_ROLE"){
        

        next();
        return;
    }else{

        return res.status(401).json({
            ok: false,
            mensaje: 'No es administrador',
            errors: 'Token incorrecto - no es administrador'
        });
    }

}

exports.verificaAdminRoleOMismoUsuario = function (req,res, next) {
    var usuario = req.usuario;
    var id = req.params.id;


    if(usuario.role === "ADMIN_ROLE" && usuario._id != id){
        

        next();
        return;
    }else{

        return res.status(401).json({
            ok: false,
            mensaje: 'no es administrador Ó el mismo usuario',
            errors: 'no es administrador Ó el mismo usuario'
        });
    }

}