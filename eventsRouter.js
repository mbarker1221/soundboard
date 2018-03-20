const express = require('express');
const app = express();
const router = express.Router();

const eventsRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//const {Events} = require('./models');
const morgan = require('morgan');


//const {Events} = require('./models');

/*
router.get('/', (req, res) => {
  res.json(Events.get())
});

*/
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
/*
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


*/
/*

var eventTemplate = (
  '<div> class="event_results_page">' +
    '<h2>Check out these upcoming shows!</h2>' +

    '<p class="title"</p>' +
    '<p class="city_name"</p>' +
    '<p class="starts"</p>' +
    '<p class="venueE"</p>' +
    '<p class="address"</p>' +
    '<p class="description"</p>' +
        '<p class="button-label">interested' +
      '</button></p>'+
      
    '</div>' +
  '</li>'
);




var locateUrl = 'http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location={locate}&date=future';

function getAndDisplayEvents() {
  console.log('Retrieving events')
  $.getJSON(locateUrl, function(event) {
    console.log('Rendering events');
    var eventsElement = events.map(function(event) {
      var element = $(eventTemplate);
        
    
      element.find('.title').text(event.title);
       element.find('.city_name').text(event.city_name);
        element.find('.starts').text(event.starts);
         element.find('.venueE').text(event.venueE);
          element.find('.address').text(event.address);
           element.find('.description').text(event.description);
      event.details.forEach(function(details) {
        element.find('.js-event-details').append(
          '<li>' + details + '</li>');
      });
      return element;
    });
    $('.event_results_page').html(eventsElement)
  });
}


module.exports = {router, eventTemplate} ;


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
module.exports = {router};

