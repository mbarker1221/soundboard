const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {event} = require('./config');

router.get('/', (req, res) => {
    res.json(router.get());
});

//upcoming events eventful
var request = require("request");

var options = {method: 'GET',
  url: 'http://api.eventful.com/json/events/search',
  qs: 
   { 
     app_key: 'c7nd5jGWK8tkcThz',
     keywords: 'music',
     location: 'atlanta',
     date: 'future',
     include: 'price,tickets,popularity'},
  headers: 
   {
    'Postman-Token': 'f057a665-ec96-d919-1330-bd4a01c0548c',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic bWJhcmtlcjEyMjFAZ21haWwuY29tOnNob21waW4x'} 
 };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

router.get('/events', (req, res) => {
    res.json(Events.get());
});

//artist search songkick
var options = {method: 'GET',
  url: 'http://api.songkick.com/api/3.0/search/artists.json',
  qs: {apikey: 'ovLum2i3CCGRjtHA', query: '{Lady_Gaga}'},
  headers: 
   {'Postman-Token': 'e8988bc0-b627-7328-42e0-b90f09bdf8f5',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic bWJhcmtlcjEyMjE6c2hvbXBpbjE='}};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

router.get('/events', (req, res) => {
    res.json(Events.get());
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

module.exports = router;

