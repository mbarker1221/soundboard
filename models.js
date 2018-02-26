const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uuid = require('uuid'); 
app.use(morgan('common'));
app.use(bodyParser.json());


const EventSchema = mongoose.Schema({
  title: {type: String},
  city_name: {type: String},
  start_date: {type: String},
  venue_name: {type: String},
  url: {type: String},
  description: {type: String},
});

EventSchema.methods.serialize = function() {
  return {
    title: this.title,
    city_name: this.city_name,
    start_date: this.start_date,
    venue_name: this.venue_name,
    url: this.url,
    description: this.description
  };
}

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String},
  email: {type: String}
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email
  };
}

const User = mongoose.model('User', userSchema);
//module.exports = {createUser};
module.exports = {User};
 
