const express = require('express');
var app = express();
app.use(express.static('public'));

const futureUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location=atlanta&date=future"

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const eventsRouter = express.Router();
const {events} = require('./models');

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
const {event} = require('./models');
const {Location} = require('./models');


eventsRouter.get('/events', (req, res) => {
    res.json(Events.get());
});
function fetchEvents() {
  $.getJSON(futureURL, function(data) {
    showEvents(data);
  });
}
function showEvents(results) {
   let show = results.events.event.performer.name;
   $(`#show`).text(show);
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

module.exports = eventsRouter;