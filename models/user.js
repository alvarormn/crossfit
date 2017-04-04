'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  name: String,
  surname: String,
  password: String,
  email: String,
  role: String,
  image: String
    //nodo: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('User', userSchema);
