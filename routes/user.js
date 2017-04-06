'use sctrict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_auth =require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ iploadDir: './uploads/users' })

//api.get('/probando-controlador', userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/loginUser', userController.loginUser);
api.post('/pruebaAutorizacion', md_auth.ensureAuth, userController.authentication);
api.post('/uploadImage/:id', md_auth.ensureAuth, userController.uploadImage);
api.put('/updateUser/:id', [md_auth.ensureAuth, md_upload], userController.updateUser);

module.exports = api;
