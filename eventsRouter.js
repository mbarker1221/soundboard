const express = require('express');
const app = express();
const router = express.Router();

const eventsRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const morgan = require('morgan');

app.get('/events', (req, res) => {
  Event
    .find()
    .then(events => {
      res.json(events.map(event => event.serialize()))
  })
    .catch(err => {
      console.error(err);
      next();
      res.status(500).json({error: 'error'});
    });
});

module.exports = {router};

