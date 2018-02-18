const express = require('express');
var app = express();
app.use(express.static('public'));

const futureUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location=atlanta&date=future"

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const eventsRouter = express.Router();


const handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL,PORT} = require('./config');
const {user} = require('./models');
const {events} = require('./models');
const {Location} = require('./models');




/*
eventsRouter.get('/events', (req, res) => {

  const {title} = results.events.event.title,
  const {city_name} = results.events.event.city_name,
  const {start_time} = results.events.event.start_time, 
  const {description} =  results.events.event,
  const {venue_name} = results.events.event.venue_name,
  const {artist_name} = results.events.event.artist_name,
  
res.json(events.get());
});














app.get('events', (req, res) => {
  events
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

var request = require("request");

app.get('events', function(req,res) {
  Event.find
}) = { method: 'GET',
  url: 'http://api.eventful.com/json/events/search',
  qs: 
   { app_key: 'c7nd5jGWK8tkcThz',  },
     keywords: 'music',
     query: '{city_name}',
     date: 'future',
     },
  headers: 
   { 'Postman-Token': '334ca6ee-4d52-8fb0-37cf-2a8f08f76185',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic bWJhcmtlcjEyMjFAZ21haWwuY29tOnNob21waW4x',
     location: 'atlanta' } };



request(event, function(error, request, body) {

  $.getJSON(futureURL, function(data) {
    showEvents(data);
  });
})
function showEvents(results) {
  let title = results.events.event.title,
  let city_name = results.events.event.city_name,
  let start_time = results.events.event.start_time, 
  let description =  results.events.event,
  let venue_name = results.events.event.venue_name,
  let artist_name = results.events.event.artist_name,
   $(`#title`).text(show);
 };
 

//artist search songkick
var request = require("request");

var options = { method: 'GET',
  url: 'http://api.songkick.com/api/3.0/search/artists.json',
  qs: { apikey: 'ovLum2i3CCGRjtHA', query: '{artist_name}' },
  headers: 
   { 'Postman-Token': 'e3d9ab6c-fa42-6a95-1657-73445bde3eaf',
     'Cache-Control': 'no-cache',
     ovLum2i3CCGRjtHA: 'basic' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

//search by location songkick
var request = require("request");

var options = {method: 'GET',
  url: 'http://api.songkick.com/api/3.0/search/locations.json',
  qs: {query: '{search_query}', apikey: 'ovLum2i3CCGRjtHA'},
  headers: 
   {'Postman-Token': '3b05f427-43ff-d13f-e877-5bc202b81e89',
     'Cache-Control': 'no-cache'}};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

//similar artists songkick
var request = require("request");

var options = { method: 'GET',
  url: 'http://api.songkick.com/api/3.0/artists/{query}/similar_artists.json',
  qs: { apikey: 'ovLum2i3CCGRjtHA', query: '{Lady_Gaga}' },
  headers: 
   { 'Postman-Token': 'b210e5f2-099c-f927-a55c-000bdfa0b285',
     'Cache-Control': 'no-cache'} };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

module.exports = eventsRouter;*/