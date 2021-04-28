const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("../models/usuario")
const Usuario = mongoose.model("usuario")

module.exports = function(passport){
passport.use(new localStrategy({usernameField: 'emaillogin', passwordField: 'senhalogin'}, (emaillogin, senhalogin, done) =>{
    Usuario.findOne({email:emaillogin}).then((usuario) =>{
        if(!usuario){
            return done(null, false, {message: "Não existe usuário com esse email"})
        }

        bcrypt.compare(senhalogin, usuario.senha, (erro, batem)=>{
            if(batem){
                return done(null, usuario)
            }else{
                return done(null, false, {message: "Senha incorreta!"})
            }
        })
    })
}))

passport.serializeUser((usuario, done)=>{
    done(null,usuario.id)
})

passport.deserializeUser((id, done)=>{
    Usuario.findById(id, (err, usuario) =>{
        done(err, usuario)
    })
})

}

