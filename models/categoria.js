var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
 

var categoriaSchema = new Schema ({

    nombre : {type: String, unique: true, required: [true, 'El nombre es requerido'] },
    descripcion : {type: String },
    pref : {type: String },
    enfermedad : [{type: Schema.Types.ObjectId, ref: 'Patologia'}],
    created_at: String
 
});

categoriaSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unico'});


module.exports =  mongoose.model('Categoria', categoriaSchema);