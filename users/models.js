'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

const uuid = require('uuid');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const Users = {
  create: function(username, password, email) {
    console.log('Creating a new user');
    const user = {
      //id: uuid.v4(),
      username: username,
      password: password,
      email: email
    };
    this.users[user.id] = user;
    return user;
  },
  get: function() {
    console.log('Retreiving users');
    return Object.keys(this.users).map(key => this.users[key]);
  },
  delete: function(userId) {
    console.log(`Deleting user with id \`${userId}\``);
    delete this.users[userId];
  },
  update: function(updatedUser) {
    console.log(`Updating user with id \`${updatedUser.id}\``);
    const {id} = updatedUser;
    if (!(id in this.users)) {
      throw StorageException(
        `Can't update user \`${id}\` because it doesn't exist.`);
    }
    this.users[updatedUser.id] = updatedUser;
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
