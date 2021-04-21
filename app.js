const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash')
require("./models/usuario")
require("./models/nivel1")
const Usuario = mongoose.model("usuario")
const Nivel1 = mongoose.model("nivel1")

//Configurações
//Sessão
app.use(session({
    secret:"superseguro",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})
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
app.use(express.static(path.join(__dirname, "public")))

//Rotas
app.get('/', (req, res) => {
    res.render("layouts/login")
} )
app.get('/login', (req, res) => {
    res.render("layouts/login")
} )
app.get('/cadastro', (req, res) => {
    res.render("layouts/cadastro")
} )
app.get('/home', (req, res) => {
    res.render("layouts/home")
} )
app.get("/nivel1", function (req, res) {
    Nivel1.aggregate([{$sample: {size:3}}]).then((nivel1p) => {
        console.log(nivel1p)
        res.render("layouts/nivel1", {nivel1p: nivel1p})
        
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao listar as perguntas!")
        res.redirect("/home")
    })  
});
app.get("/nivel2", function (req, res) {
    res.render("layouts/nivel2")
});
app.get("/nivel3", function (req, res) {
    res.render("layouts/nivel3")
});
app.get("/ranking", function (req, res) {
    Usuario.find().sort({pontuacao:-1}).then((usuarios) => {
        console.log(usuarios)
        res.render("layouts/ranking", {usuarios: usuarios.map(category => category.toJSON())})
        
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao listar o ranking!")
        res.redirect("/home")
    })  
});
app.get("/criadores", function (req, res) {
    res.render("layouts/criadores")
});
app.post('/novocadastro', (req, res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
        erros.push({texto: "Sobre nome inválido"})
    }
    if(req.body.senha.length < 6){
        erros.push({texto: "Senha deve ter no mínimo 6 caracteres!"})
    }

    if(erros.length > 0){
        res.render("layouts/cadastro", {erros: erros})
    }   

   const novoUsuario = {
       nome: req.body.nome,
       sobrenome: req.body.sobrenome,
       email: req.body.email,
       senha: req.body.senha
   }

   new Usuario(novoUsuario).save().then(()=>{
    console.log('Usuário cadastrado com sucesso!')
    req.flash("success_msg", "Usuário cadastrado com sucesso!")
    res.redirect("/login")
    }).catch(()=>{
    console.log('Erro ao cadastrar Usuário!')
    req.flash("error_msg", "Erro ao cadastrar usuário!")
    });
});

app.post('/updatepontuacao', async function(req, res){
    let usuario;
    await Usuario.findOne({email:"nathan.patrike@gmail.com"}).then((usr) => {
        console.log({usr})
        usuario = usr;
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao consultar usuário!")
    })

    const pontuacao = Number(req.body.nota) + usuario.pontuacao;

    Usuario.findOneAndUpdate({email: usuario.email}, {pontuacao}).then(() =>{
        console.log({pt:pontuacao})
        req.flash("success_msg", `${usuario.nome}, sua pontuação agora é ${pontuacao}`)
        res.redirect("/home")
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao atualizar a pontuação!")
    })
})
//Outros
const PORT = 8081
app.listen(PORT, function() {
    console.log("Servidor no http://localhost:8081")
})