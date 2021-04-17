const mongoose = require('mongoose');
const config = require('./config/config');
mongoose.connect(config.connection,{useUnifiedTopology:true,useNewUrlParser:true
, useCreateIndex:true}).then(()=>{
console.log('conectado');
}).catch(()=>{
console.log('não conectado');
});