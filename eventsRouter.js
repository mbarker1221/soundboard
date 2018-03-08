'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const eventsRouter = express.Router();
const morgan = require('morgan');
const router = express.Router();
app.use(morgan('common'));
app.use(bodyParser.json());

app.get('${query}', (req, res) => {
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
      res.json(artist.map(artist => artist.serialize()))
    })
    .catch(err => {
      console.error(err);
      next();
      res.status(500).json({error: 'error'});
    });
});

module.exports = {eventsRouter};






/*

const eventTemplate = 

  const {title} = results.events.event.title,
 const {city_name} = results.events.event.city_name,
  const {start_time} = results.events.event.start_time, 
  const {description} =  results.events.event,description,
  const {venue_name} = results.events.event.venue_name,
  const {artist_name} = results.events.event.artist_name,
  const {image} = results.events.event.image.small.url
  };

  showEvents();

const http = require('http');

http.createServer((request, response) => {
  const {headers, method, locateUrl} = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
     response.on('error', (err) => {
      console.error(err);
    });
     response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    const responseBody = {headers, method, locateUrl, body};

    response.write(JSON.stringify(responseBody));
    response.end();
  })
});//.listen(8080);


*/
