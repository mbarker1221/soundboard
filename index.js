const express = require('express');
const app = express();
app.use(express.static('public'));

const MOCK_EVENTS = {
	"events": [

	{ 
	 "name": "rock show",
     "artist" : "rock star",
	 "date" : "February 25, 2018",
	 "venue": "stadium"
	},

	{
	 "name": "rap show",
	 "artist": "rap star",
	 "date": "February 29, 2018",
	 "venue": "civic center"
	},

	{
	 "name": "country show",
	 "artist": "country singer",
	 "date": "March 24, 2018",
	 "venue": "honky tonk bar"
	},
	
	{
	 "name": "electronic music show",
	 "artist": "dj killer",
	 "date": "April 02, 2018",
	 "venue": "goat farm"
	}
  ]
};

function getEvents(callbackF) {
setTimeout(function() { 
	callbackF(MOCK_EVENTS)}, 2);
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
