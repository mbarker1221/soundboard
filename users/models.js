'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

const uuid = require('uuid');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const Users = {
  create: function(username, password, email) {
    console.log('Creating a new User');
    const User = {
      //id: uuid.v4(),
      username: username,
      password: password,
      email: email
    };
    this.Users[User.id] = User;
    return User;
  },
  get: function() {
    console.log('Retreiving users');
    return Object.keys(this.Users).map(key => this.Users[key]);
  },
  delete: function(UserId) {
    console.log(`Deleting User with id \`${UserId}\``);
    delete this.Users[UserId];
  },
  update: function(updatedUser) {
    console.log(`Updating User with id \`${updatedUser.id}\``);
    const {id} = updatedUser;
    if (!(id in this.User)) {
      throw StorageException(
        `Can't update User \`${id}\` because it doesn't exist.`);
    }
    this.Users[updatedUser.id] = updatedUser;
    return updatedUser;
  }
};


const UserSchema = mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   }
});

UserSchema.methods.serialize = function () {
   return {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email
   };
};

UserSchema.methods.validatePassword = function (password) {
   return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
   return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
