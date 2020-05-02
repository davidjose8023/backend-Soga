var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var medicoSchema =	new Schema({
        nombre: {type: String,	required: [true,'El  nombre es necesario']},
        apellido: {type: String,required: false},
        telefono: {type: String,required: false},
        email: {type: String,required: false},
        especialidad: {type: String,required: [true,'La Especialdad es necesario']},
        img: {type: String,required: false },
        usuario: {type: Schema.Types.ObjectId,	ref: 'Usuario',	required: true },
        hospital: [{type: Schema.Types.ObjectId, ref: 'Hospital', required: [true,'El id hospital es un	campo obligatorio']}]
});
module.exports = mongoose.model('Medico', medicoSchema);