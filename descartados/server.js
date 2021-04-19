const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/config');
mongoose.connect(config.connection,{useUnifiedTopology:true,useNewUrlParser:true
, useCreateIndex:true}).then(()=>{
console.log('conectado');
}).catch(()=>{
console.log('não conectado');
});

const UsuarioSchema = mongoose.Schema({
    nome: {type:String, required:true},
    sobrenome: {type:String, required:true},
    email: {type:String, required:true},
    senha: {type:String, required:true},
    pontuacao: {type:Number, required:true}
    })
    module.exports = mongoose.model('usuario', UsuarioSchema);
    
    const NovoUsuario = mongoose.model('usuario')
    
    new NovoUsuario({
        nome:"Nathan",
        sobrenome:"Weber",
        email:"nathanpatrike@gmai.com",
        senha:"123456",
        pontuacao:0
    }).save().then(() => {
        console.log("Usuário cadastrado")
    }).catch((err) => {
        console.log("Erro ao cadastrar usuário")
    })