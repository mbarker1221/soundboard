

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
const {Events} = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('./events', (req, res) => {
  Events
    .find()
    .then(events => {
      res.json(event.map(events => event.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'error'});
    });
});

const events = [
	{
  id: uuid.v4(),
  title: {type: String, required: true},
  venue_name: {type: String, required: true},
  start_date: {type: Date, default: Date.now},
  city_name: {type: String, required: true},
  description: {type: String, required: true},
  url: {type: url}
}]

app.all('/', (req, res) => res.status(201).send('ok'));;
app.listen(process.env.PORT || 8080);
