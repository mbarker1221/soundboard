const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL,PORT} = require('./config');
const userRouter = require('./userRouter');
const eventRouter = require('./eventsRouter');

app.use(morgan('common'));
app.use(bodyParser.json());

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

const User = mongoose.model('User', userSchema);
module.exports = {User};

const Event = mongoose.model('Event', EventSchema);
module.exports = {Event};

           