const mongoose = require('mongoose');
const Usuario = mongoose.Schema({
nome: {type:String, required:true},
sobrenome: {type:String, required:true},
email: {type:String, required:true},
senha: {type:String, required:true},
pontuacao: {type:String, required:true}
})
module.exports = mongoose.model("Usuario", Usuario);