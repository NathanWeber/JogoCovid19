const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Nivel1 = new Schema({
key: {type:String,require:true},
pergunta: {type:String, required:true},
peso: {type:Number, required:true},
alternativas: [
    {
        key: {type:String,require:true},
        resposta: {type:String,require:true},
        certo: {type:Boolean,require:true},
    }
]
// verdadeiro: {
//     resposta: {type:String,require:true},
//     certo: {type:Boolean,require:true}
// },
// falso: {
//     resposta: {type:String,require:true},
//     certo: {type:Boolean,require:true}
// },
})

mongoose.model('nivel1', Nivel1);

const NovoNivel1 = mongoose.model('nivel1')