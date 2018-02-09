'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

mongoose.Promise = global.Promise;

const User = {
  create: function(username, password, email) {
    console.log('creating user');
    const user = {
      username: username,
      password: password,
      email: email,
      myEvents: myEvents
    },
  });
}

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const Event = {
  create: function(title, venue_name, start_date, city_name, description, url) {
    console.log('Creating new event');
    const event = {
    id: uuid.v4(),
    title: title,
    venue_name: venue_name,
    start_date: start_date,
    city_name: city_name,
    description: description,
    url: url
    };
    this.events[event.id] = event;
    return event;
  },
  get: function() {
    console.log('Retrieving events');
    return Object.keys(this.events).map(key => this.events[key]);
  },
  delete: function(id) {
    console.log(`Deleting event \`${id}\``);
    delete this.events[id];
  },
  update: function(updatedEvent) {
    console.log(`Updating event \`${updatedEvent.id}\``);
    const {id} = updatedEvent;
    if (!(id in this.Event)) {
      throw StorageException(
        `Can't update event \`${id}\` because it doesn't exist.`)
    }
    this.events[updatedEvent.id] = updatedEvent;
    return updatedEvent;
  }
};

function createEvent() {
  const storage = Object.create(Event);
  storage.items = {};
  return storage;
}

module.exports = {
  Event: createEvent(),
  User: createUser(),
}

