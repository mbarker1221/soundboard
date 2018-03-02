const express = require('express');
const app = express();
const user = require('./server.js');
const uuid = require('uuid');
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
      id: uuid.v4(),
      username: username,
      password: password,
      email: email
    };
    this.User[User.id] = User;
    return User;
  },

  get: function() {
  console.log('Retrieving user');
    return Object.keys(this.User).map(key => this.User[key]);
  },

  delete: function(id) {
    console.log(id);
    console.log(`Deleting user ${id}`);
 //User.findByIdAndRemove(id)
    delete this.User[id];
  },

  update: function(updatedUser) {
    console.log(`Updating User \`${updatedUser.id}\``);
    const {id} = updatedUser;
    if (!(id in this.User)) {
   console.log(`can't update user because user does not exist`);
     }
    this.User[updatedUser.id] = updatedUser;
    return updatedUser;
  },
};
function createUser() {
 const storage = Object.create(User);
  storage.User = {};
  return storage;
}

module.exports = {User: createUser()
}
 
