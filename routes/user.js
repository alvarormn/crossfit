'use sctrict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_auth =require('../middlewares/authenticated')

//api.get('/probando-controlador', userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/loginUser', userController.loginUser);
api.post('/pruebaAutorizacion', md_auth.ensureAuth, userController.authentication);


module.exports = api;
