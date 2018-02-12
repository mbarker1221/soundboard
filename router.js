const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {event} = require('/config');
const{user} = require('/config');

router.get('/', (req, res) => {
    res.json(router.get());
});

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


var options = { method: 'GET',
  url: 'http://api.songkick.com/api/3.0/search/artists.json',
  qs: { apikey: 'ovLum2i3CCGRjtHA', query: '{Lady_Gaga}' },
  headers: 
   { 'Postman-Token': 'e8988bc0-b627-7328-42e0-b90f09bdf8f5',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic bWJhcmtlcjEyMjE6c2hvbXBpbjE=' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


$.getJSON("http://api.songkick.com/api/3.0/events.json?location=atlanta&apikey={ovLum2i3CCGRjtHA}";
function(data){
// data is JSON response object
});

router.get('/events', (req, res) => {
    res.json(Events.get());
});

router.post('/users', jsonParser, (req, res) => {
    const requiredFields = ["id", "username", "password", "email"];
     for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing\`${field}\` in request body`
            return res.status(400).send(message);
        }
    }
    const newUser = Users.create(
        req.body.id, req.body.username, req.body.password, req.body.email),
    res.status(201).json(newUser)
});

router.put('/users/:id', jsonParser, (req, res) => {
        const requiredFields = ["id", "username", "password", "email"];
        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!(field in req.body)) {
                const message = `Missing \`${field}\` in request body`
                return res.status(400).send(message);
                 }
                }
     if (req.params.id !== req.body.id) {
       const message = `Request path id (${req.params.id}) and request body id (${req.body.id}}) match`;
     return res.status(400).send(message);
    } 
});

console.log(`Updating user with id \`${req.params.id}\``);
  const updatedUser = Users.update({
    id: req.params.id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  res.status(204).end();
});

router.delete('/users/:id', (req, res) => {
    Users.delete(req.params.id);
    res.status(204).end();
});

module.exports = router;

