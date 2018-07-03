//'use strict';
/*jshint esversion: 6 */
/*jshint node: true */
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  // id: {
    //  type: String
   //},
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
  
// userSchema.virtual("id").get(function() {
//   return `${this.user.id}`;
//});


userSchema.methods.serialize = function () {
   return {
      id: this._id,
      username: this.username,
      password: this.password,
      email: this.email
   };
};

userSchema.methods.validatePassword = function (password) {
   return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
   return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = {User};