const express = require('express');
const app = express();
const {DATABASE_URL,PORT} = require('./config');
const {User} = require('./models');
const {Event} = require('./models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const mongoose = require('mongoose');
const rest = require('connect-rest');
mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));
const request = require("request");

  var events = {
      method: 'GET',
      url: 'http://api.eventful.com/json/events/search',
      qs:
      {
        app_key: 'c7nd5jGWK8tkcThz', 
        keywords: 'music',
        location: 'atlanta',
        date: 'future',
      },
        headers: 
        {
          'Postman-Token': 'e3ab5da1-1f81-7c89-38a6-5e1e4596074d',
          'Cache-Control': 'no-cache',
          Authorization: 'Basic bWJhcmtlcjEyMjFAZ21haWwuY29tOnNob21waW4x' 
        } 
    };
    request(events, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });

function getEvents() {
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

//function getArtist from public.html returns artist data
  function getArtist() {
    app.get('/artist', (req, res) => {
      var artist = {
        method: 'GET',
        url: 'http://api.songkick.com/api/3.0/search/artists.json',
        qs: {apikey: 'ovLum2i3CCGRjtHA',
        query: req.query.artist},
        headers: 
          {
            'Postman-Token': 'd727db37-cc7e-e536-8a28-8820a8a61bec',
            'Cache-Control': 'no-cache',
            'ovLum2i3CCGRjtHA': 'basic'
          } 
      };
  
        request(artist, function (error, response, body) {
          if (error) throw new Error(error);
        res.json(JSON.parse(body))
        })
    })
  };
 
//getEvents function from public.html returns events based on location
function getEvents() {
  app.get('/location', (req, res) => {
    var location =
      {
        method: 'GET',
        url: 'http://api.songkick.com/api/3.0/search/locations.json',
        qs: {apikey: 'ovLum2i3CCGRjtHA',
        query: req.query.location},   
        headers: 
          {
            'Postman-Token': '1731f7bf-5025-71b8-d814-3ed821e42a47',
            'Cache-Control': 'no-cache'
          } 
      }
  })
}
 request(location, function (error, response, body) {
          if (error) throw new Error(error);
        res.json(JSON.parse(body));
      })
}

 //retrieve user
  var getUser = {
    method: 'GET',
    url: 'http://localhost:8080/users',
    qs: {apikey: 'ovLum2i3CCGRjtHA'},
    headers: 
      {
        'Postman-Token': '7edd8b14-d6d5-259b-c0f5-90f22ff49dc4',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
    body: {username: 'db3', password: 'switch', email: 'bd3@gmail.com'},
    json: true
  };


app.get('/user', (req, res) => {
  User
  .find()
  .then(users => {
    res.json(users.map(user => user.serialize()));
  })
   .catch(err => {
    console.error(err);
    res.status(500).json({error: 'something is seriously wrong'});
  });
});


//create new user
var postUser = {
  method: 'POST',
  url: 'http://localhost:8080/user',
  headers: 
   {
    'Postman-Token': '7d892e32-cf81-5fc7-957c-9db812beeddf',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json'
   },
  body: 
    {
     username: 'sweet',
     password: 'loco',
     email: 'm@gmail.com',
     shows: ['1233456', '123454556'] 
    },
  json: true
};


app.post('/user', (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  };
    User
    .create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    .then(
      user => res.status(201).json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

//update user
var putUser = 
  {
    method: 'PUT',
    url: 'http://localhost:8080/user',
    headers: 
      {
        'Postman-Token': 'dfda2be5-586f-d673-9395-4974ed0dea03',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
    body: {password: '12345', username: 'fromME', email: 'me@gmail.com'},
    json: true
  };


app.put('/user/:_id', (req, res) => {
    const updated = {};
    const updateableFields = ['username', 'password', 'email'];
  User.update({
     username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
});

//delete user
var deleteUser = {
  method: 'DELETE',
  url: 'http://localhost:8080/user',
  headers: 
   {
    'Postman-Token': '9434aa6e-43d9-9430-238f-96be25b70cdd',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
   },
  body: 
   {
    id: '5a89c98442fa8e04a470f796',
    username: 'fromPostman',
    password: 'jfdksa;',
    email: 'jfjf@gmail.com'
   },
  json: true
};


app.delete('/user/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(() => {
       res.status(204).json({message: 'Success!'});
     })
      .catch(err => {
        console.error(err);
        next();
     res.status(500).json({error: 'did not delete!'});
    });
});


 app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'})
 });


    let server;

      function runServer(databaseUrl, port = PORT) {
        return new Promise((resolve, reject) => {
          mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err)
        }
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`)
        resolve();
      })
        .on('error', err => {
        mongoose.disconnect()
        reject(err);
        });
      });
    });
  }
    function closeServer() {
      return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
          console.log('Closing server');
            server.close(err => {
              if (err) {
                return reject(err)
              }
                resolve();
              });
            });
          });
        }
    if (require.main === module) {
      runServer(DATABASE_URL).catch(err => {
        console.error(err)
      })
      }
    module.exports = {runServer, app, closeServer};