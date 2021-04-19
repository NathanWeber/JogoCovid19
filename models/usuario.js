const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
nome: {type:String, required:true},
sobrenome: {type:String, required:true},
email: {type:String, required:true},
senha: {type:String, required:true},
pontuacao: {type:Number, required:true, default: 0}
})

mongoose.model('usuario', Usuario);

const NovoUsuario = mongoose.model('usuario')