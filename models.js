const express = require('express');
const app = express();
const user = require('./server.js');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(bodyParser.json());


const User = {
  create: function(username, password, email) {
    console.log('Creating new User');
    const User = {
      username: username,
      password: password,
      email: email
    };
    this.User.push(User);
    return User;
    //[user.id] = user;
    //return user;
  },

  get: function() {
  console.log('Retrieving user');
    return Object.keys(this.User).map(key => this.User[key]);
  },

  delete: function(id) {
    console.log(id);
    console.log(`Deleting user ${id}`);
  User.findByIdAndRemove(id, => {
    console.log("success"))
  }
  
},

  update: function(updatedUser) {
    console.log(`Updating user \`${updatedUser.id}\``);
    const {id} = updatedUser;
   // if (!(id in this.users)) {
 //     throw StorageException(
     //   `Can't update user \`${id}\` because user does not exist.`)
   // }
    this.User[updatedUser.id] = updatedUser;
    return updatedUser;
  },
};
function createUser() {
 const storage = Object.create(User);
  storage.User = [];
  return storage;
}



module.exports = {User: createUser()}
 
