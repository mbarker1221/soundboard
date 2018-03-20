const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const eventsRouter = express.Router();
const morgan = require('morgan');
const router = express.Router();
app.use(morgan('common'));
app.use(bodyParser.json());


const mongoose=require('mongoose');

const UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  });

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email
  };
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};
