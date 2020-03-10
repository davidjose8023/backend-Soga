var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var CitaSchema = new Schema ({

    nombres : {type: String, required: [true, 'El nombre es requerido'] },
    apellidos : {type: String, required: [true, 'El apellido es requerido'] },
    telefono : {type: String, required: [true, 'El telefono es requerido'] },
    rut : {type: String, unique: true, required: [true, 'El rut es requerido'] },
    email : {type: String, unique: true },
    classname : {type: String},
    usuario: {	type: Schema.Types.ObjectId,	ref: 'Usuario'},
    medico: { type: Schema.Types.ObjectId,	ref: 'Medico'},
    start : {type: Date, required: [true, 'La fecha inicio es requerida'] },
    end : {type: Date, required: [true, 'La fecha fin  es requerida'] },
 
});

CitaSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unico'});

module.exports =  mongoose.model('Cita', CitaSchema);