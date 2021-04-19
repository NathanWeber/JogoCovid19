const express = require('express');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const mongoose = require('mongoose');
require("./models/usuario")
const Usuario = mongoose.model("usuario")

//Configurações
//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/jogocovid19").then(()=>{
    console.log('conectado');
    }).catch(()=>{
    console.log('não conectado');
    });

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Rotas

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
} )
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
} )
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname + '/cadastro.html'));
} )
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
} )
app.get("/nivel1", function (req, res) {
    res.sendFile(path.join(__dirname + '/nivel1.html'));
});
app.get("/nivel2", function (req, res) {
    res.sendFile(path.join(__dirname + '/nivel2.html'));
});
app.get("/nivel3", function (req, res) {
    res.sendFile(path.join(__dirname + '/nivel3.html'));
});
app.get("/ranking", function (req, res) {
    res.sendFile(path.join(__dirname + '/nivel1.html'));
});
app.get("/criadores", function (req, res) {
    res.sendFile(path.join(__dirname + '/criadores.html'));
});
app.post('/novocadastro', (req, res) => {
   const novoUsuario = {
       nome: req.body.nome,
       sobrenome: req.body.sobrenome,
       email: req.body.email,
       senha: req.body.senha
   }

   new Usuario(novoUsuario).save().then(()=>{
    console.log('Usuário cadastrado com sucesso!');
    }).catch(()=>{
    console.log('Erro ao cadastrar Usuário!');
    });
} )

//Outros
const PORT = 8081
app.listen(PORT, function() {
    console.log("Servidor no http://localhost:8081")
})