'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  username: {type: username, required: true},
  password: {type: password, required: true},
  email: {type: email, required: true}
});

userSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.userame,
    password: this.password,
    email: this.email,
  };
};

const User = mongoose.model('User', userSchema);

module.exports = {User};


  