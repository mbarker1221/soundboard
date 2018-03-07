const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');

mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(bodyParser.json());

const UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  });

UserSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email
  };
};

//UserSchema.methods.validatePassword = function(password) {
//  return bcrypt.compare(password, this.password);
//};

//UserSchema.stastics.hashPassword = function(password) {
// return bcrypt.hash(password, 10);
//};

const User = mongoose.model('User', UserSchema);

module.exports = {User};



 

