const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const EventSchema = mongoose.Schema({
  title: {type: String},
  city_name: {type: String},
  venue_address: {type: String},
  start_time: {type: String},
   description: {type: String},
  provider: {type: String},
  event_url: {type: String},
    venue_name: {type: String},
    artist_name: {type: String},
    artist_url: {type: String},
});

EventSchema.methods.serialize = function() {
  return {
    title: this.title,
    city_name: this.city_name,
    venue_name: this.venue_name,
    venue_address: this.venue_address,
    start_time: this.start_time,
    description: this.description,
    event_url: this.event_url,
     provider: this.provider,
     artist_name: this.artist_name,
     artist_url: this.artist_url

  };
}

const UserSchema = mongoose.Schema({
  id: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}
});

UserSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email,
  };
}

const User = mongoose.model('User', UserSchema);
const Event = mongoose.model('Event', EventSchema);
module.exports = {Event};
module.exports = {User};


/*
const uuid = require('uuid');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



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
  
 get:function() {
console.log('retrieving event');
return Object.keys(this.events).map(key => this.events[key]);
 },
};
*/
