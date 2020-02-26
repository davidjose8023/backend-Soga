var mongoose = require('mongoose');


var Schema = mongoose.Schema;

 

var patologiaSchema = new Schema ({

    nombre : {type: String, required: [true, 'El nombre es requerido'] },
    descripcion : {type: String },
    categoria : {type: Schema.Types.ObjectId, ref: 'Categoria',required: [true, 'La categoria es requerida'] },
    created_at: String
 
});



module.exports =  mongoose.model('Patologia', patologiaSchema);