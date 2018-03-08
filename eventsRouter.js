const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const eventsRouter = express.Router();
const morgan = require('morgan');
const router = express.Router();
app.use(morgan('common'));
app.use(bodyParser.json());


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

app.get('/artist', (req, res) => {
  Artist
    .find()
    .then(artist => {
      res.json(events.map(artist => artist.serialize()))
    })
    .catch(err => {
      console.error(err);
      next();
      res.status(500).json({error: 'error'});
    });
});

module.exports = {router};


/*

function showEvents(results) {

  const {title} = results.events.event.title,
  const {city_name} = results.events.event.city_name,
  const {start_time} = results.events.event.start_time, 
  const {description} =  results.events.event,description,
  const {venue_name} = results.events.event.venue_name,
  const {artist_name} = results.events.event.artist_name,
  const {image} = results.events.event.image.small.url
  };

  showEvents();


*/


