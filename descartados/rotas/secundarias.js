const express = require('express');
const router = express.Router()
const path = require('path'); 

router.get('/criadores', (req, res) => {
    res.send("Página de criadores")
} )

router.get('/nivel1', (req, res) => {
    res.send("nivel1")
} )

router.get('/nivel2', (req, res) => {
    res.send("nivel2")
} )

router.get('/nivel3', (req, res) => {
    res.send("nivel3")
} )

router.get('/ranking', (req, res) => {
    res.send("ranking")
} )

module.exports = router