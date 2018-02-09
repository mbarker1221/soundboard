'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('/config.js');
const {Events} = require('/models.js');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/events', (req, res) => {
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
  id: uuid.v4(),
  title: {type: String, required: true},
  venue_name: {type: String, required: true},
  start_date: {type: Date, default: Date.now},
  city_name: {type: String, required: true},
  description: {type: String, required: true},
  url: {type: url}



const MOCK_EVENTS = {
	"events": [
	{ 
	 "id": "123",
	 "title": "Rock Star",
     "venue_name" : "this place",
	 "start_date" : "2018-23-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.RockStar@eventful.com"
	},

	{
	  "id": "456",
	 "title": "Rap Star",
     "venue_name" : "this place",
	 "start_date" : "2018-25-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.rapStar@eventful.com"
	},

	{
	  "id": "789",
	 "title": "Country Star",
     "venue_name" : "that place",
	 "start_date" : "2018-27-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.CountryStar@eventful.com"
	},
	
	{
	  "id": "012",
	 "title": "Electronic Star",
     "venue_name" : "the other place",
	 "start_date" : "2018-20-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.danceYourAssOff@eventful.com"
	}
  ]
};

function getEvents(callback) {
setTimeout(function() { 
	callback(MOCK_EVENTS)}, 2);
}

function displayEvents(data) {
	for(index in data.Events) {
		$('body').append(
			'<p>' + data.Event[index].text + '<p>');
	}
}
function renderEvents() {
	getEvents(displayEvents);
}

$(function() {
	renderEvents();
});


app.all('/', (req, res) => res.status(201).send('ok'));;
app.listen(process.env.PORT || 8080);
