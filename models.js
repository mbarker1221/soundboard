const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static('public'));


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL,PORT} = require('./config');
const {User} = require('./userSchema');
const {Event} = require('./eventSchema');
const {Location} = require('./models');
const userRouter = require('./userRouter');
const eventRouter = require('./eventsRouter');

app.use(morgan('common'));
app.use(bodyParser.json());


           