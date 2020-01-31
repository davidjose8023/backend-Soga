var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var ecValidos = {
    values: ['c', 's','v'],
    message: '{VALUE} no es un estado civil valido'
};
var sexoValidos = {
    values: ['f', 'm'],
    message: '{VALUE} no es un sexo valido'
};
 

var pacienteSchema = new Schema ({

    nombre : {type: String, required: [true, 'El nombre es requerido'] },
    apellido : {type: String, required: [true, 'El apellido es requerido'] },
    telefono : {type: String, required: [true, 'El telefono es requerido'] },
    rut : {type: String, unique: true, required: [true, 'El rut es requerido'] },
    sexo : {type: String, enum: sexoValidos },
    ec : {type: String, enum: ecValidos},
    email : {type: String, unique: true, required: [true, 'El correo es requerido'] },
    img : {type: String },
    usuario: {	type: Schema.Types.ObjectId,	ref: 'Usuario',	required: true },
 
});

pacienteSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unico'});

module.exports =  mongoose.model('Paciente', pacienteSchema);