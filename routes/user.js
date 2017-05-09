'use sctrict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_auth =require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

//api.get('/probando-controlador', userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/loginUser', userController.loginUser);
api.post('/pruebaAutorizacion', md_auth.ensureAuth, userController.authentication);
api.post('/uploadImages/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);
api.get('/getImageUser/:imageFile', userController.getImageFile);
api.put('/updateUser/:id', md_auth.ensureAuth, userController.updateUser);

module.exports = api;
