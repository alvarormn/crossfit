'use sctrict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function authentication(req, res) {
  res.status(200).send({message: 'Prueba autentificacion con jwt de una funcion'})
}

function saveUser(req, res) {
  var newUser = new User();

  var params = req.body;

  newUser.name = params.name;
  newUser.surname = params.surname;
  newUser.email = params.email;
  newUser.role = params.role;
  newUser.image = params.image;

  console.log(newUser);

  if (params.password) {
    bcrypt.hash(params.password, null, null, function(err, hash) {
      newUser.password = hash;

      if (newUser.name && newUser.surname && newUser.nick && newUser.email) {
        newUser.save((err, userStored) => {
          if (err) {
            res.status(500).send({message: 'ERROR al guardar' + err});
          }else{
            if (!userStored) {
              res.status(404).send({message: 'No se ha registrado el usuario'});
            }else {
              res.status(200).send({user: userStored});
            }
          }
        });
      }else {
        res.status(200).send({message: 'Rellena todos los campos'});
      }
    })
  }
}

function loginUser(req, res){
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({email: email.toLowerCase()}, (err, user) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'})
    } else {
      if (!user) {
        res.status(404).send({message: 'El usuario no existe'})
      }else {
        bcrypt.compare(password, user.password, function(err, check) {
          if (check) {
            if (params.gethash) {
              res.status(200).send({
                token: jwt.createToken(user)
              })
            }else {
              res.status(200).send(user);
            }
          } else {
            res.status(404).send({message: 'El usuario no ha podido logearse'})
          }
        });
      }
    }
  })

}

module.exports = {
  saveUser,
  loginUser,
  authentication
};
