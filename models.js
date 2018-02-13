const uuid = require('uuid');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const User = {
  create: function(username, password, email) {
    console.log('Creating new user');
    const user = {
      id: uuid.v4(),
      username: username,
      password: password,
      email: email
    };
    this.users[user.id] = user;
    return user;
    },
   // this.users.push(user);
    //return user;
 // },

 get:function() {
console.log('retrieving user');
return Object.keys(this.users).map(key => this.users[key]);
 },
   //get: function(id) {
   // if (id !== null) {
    //  return this.users.find(user => user.id === id);
   // }
// },
  delete: function(id) {
    console.log(`Deleting user \`${id}\``);
    delete this.users[id];
  },

  update: function(updatedItem) {
    console.log(`Updating user \`${updatedUser.id}\`.`);
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


const Event = {
  create: function(title, start_time, url) {
    console.log('Creating new user');
    const event = {
      
      title: title,
      startTime: startTime,
      url:url
    };
    this.events[event.title] = event;
    return event;
    },
   // this.users.push(user);
    //return user;
 // },

 get:function() {
console.log('retrieving event');
return Object.keys(this.events).map(key => this.events[key]);
 },
};

function createEvent() {
  const storage = Object.create(Event);
  storage.itmes= {};
  return storage;

}

module.exports = {
  Event: createEvent(),
  User: createUser()
}

/*
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

*/
  