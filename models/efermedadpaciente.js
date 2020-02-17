var mongoose = require('mongoose');


var Schema = mongoose.Schema;

 

var efermedadpacienteSchema = new Schema ({

    paciente: {	type: Schema.Types.ObjectId,	ref: 'Paciente',	required: true },
    enfermedad: {	type: Schema.Types.ObjectId,	ref: 'Enfermedad',	required: true },
    created_at: String
 
});




module.exports =  mongoose.model('Efermedadpaciente', efermedadpacienteSchema);