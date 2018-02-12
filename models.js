const uuid = require('uuid');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const User = {
  create: function(id, username, password, email) {
    console.log('Creating new user');
    const user = {
      id: uuid.v4(),
      username: username,
      password: password,
      email: email
    };
    this.users.push(user);
    return user;
  },
   get: function(id=null) {
    if (id !== null) {
      return this.users.find(user => user.id === id);
    }
  },
  delete: function(id) {
    console.log(`Deleting user \`${id}\``);
    delete this.users[id];
  },
  update: function(updatedItem) {
    console.log(`Deleting user \`${updatedUser.id}\``);
    const {id} = updatedUser;
    if (!(id in this.users)) {
      throw StorageException(
        `Can't update user \`${id}\` because user doesn't exist.`)
    }
    this.users[updatedUser.id] = updatedUser;
    return updatedUser;
  }
};

function createUser() {
  const storage = Object.create(User);
  storage.items = {};
  return storage;
}

module.exports = {
  User: createUser(),
}'use strict';


const userSchema = mongoose.Schema({
  id: {type: String},
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

module.exports = {Users: createUser};


  