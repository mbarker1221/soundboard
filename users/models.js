'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

const mongoose = require("mongoose");
const uuid = require('uuid');

mongoose.Promise = global.Promise;



const UserSchema = mongoose.Schema({
   id: {
      type: String
   },
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
   }, 
});
  
UserSchema.methods.serialize = function () {
   return {
      id: this._id,
      username: this.username,
      password: this.password,
      email: this.email
   };
//   this.user[user.id]=user;
  // return user;
};

UserSchema.methods.validatePassword = function (password) {
   return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
   return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
