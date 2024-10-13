const express = require('express')
const router = express.Router()
const { login, logout } = require('../Controllers/admin')

//Login route with register validation
router.post("/login", login);
//all users route with 
router.post('/logout', logout)

module.exports = router 