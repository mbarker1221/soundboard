const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(bodyParser.json());

const EventSchema = mongoose.Schema({
  title: {type: String},
  city_name: {type: String},
  start_date: {type: String},
  venue_name: {type: String},
  description: {type: String},
  provider: {type: String},
  artist_name: {type: String},
  artist_url: {type: String},
});

EventSchema.methods.serialize = function() {
  return {
    title: this.title,
    start_date: this.start_date,
    city_name: this.city_name,
    venue_name: this.venue_name,
    description: this.description,
    provider: this.provider,
    artist_name: this.artist_name,
    artist_url: this.artist_url
  };
}

const userSchema = mongoose.Schema({
  id: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}
});

userSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email,
  };
}

const User = mongoose.model('user', userSchema);
module.exports = {User};

const Event = mongoose.model('event', EventSchema);
module.exports = {Event};

           