const express = require('express');
const router = express.Router()
const path = require('path'); 

router.get('/', (req, res) => {
res.send("Página de Login")
} )

router.get('/posts', (req, res) => {
    res.send("Página de posts")
} )

router.get('/cadastro', (req, res) => {
    res.send("Página de cadastro")
} )

router.get('/home', (req, res) => {
    res.send("Página home")
} )

router.get('/index', (req, res) => {
    res.render("layouts/index")
} ) 


module.exports = router