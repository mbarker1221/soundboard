const express = require('express');
const app = express();

app.use(express.static('public'));

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL,PORT} = require('./config');
const {User} = require('./models');
const {Event} = require('./models');
const userRouter = require('./userRouter');
const eventsRouter = require('./eventsRouter');

app.use(morgan('common'));
app.use(bodyParser.json());

const request = require("request");

const event = {method: 'GET',
  url: 'http://api.eventful.com/json/events/search',
  qs: {app_key: 'c7nd5jGWK8tkcThz', keywords: 'music', query: '{location}'},
  headers: 
   {'Postman-Token': '3fd82ae5-0866-b548-4e4c-73411812d131',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic bWJhcmtlcjEyMjFAZ21haWwuY29tOnNob21waW4x'} };

request(event, function (error, response, body) {
  if (error) throw new Error(error);
  //console.log(body);
});

const artist = {method: 'GET',
  url: 'http://api.songkick.com/api/3.0/search/artists.json',
  qs: {apikey: 'ovLum2i3CCGRjtHA', query: '{artist_name}'},
  headers: 
   {'Postman-Token': 'cbd419ef-c791-6bfb-ef07-0db3aafbeacd',
     'Cache-Control': 'no-cache',
     ovLum2i3CCGRjtHA: 'basic'} };

request(artist, function (error, response, body) {
  if (error) throw new Error(error);
//console.log(body);
});

//search  by location
const location = {method: 'GET',
  url: 'http://api.songkick.com/api/3.0/search/locations.json',
  qs: {query: '{city_name}', apikey: 'ovLum2i3CCGRjtHA'},
  headers: 
   {'Postman-Token': '1731f7bf-5025-71b8-d814-3ed821e42a47',
     'Cache-Control': 'no-cache'} };

request(location, function (error, response, body) {
  if (error) throw new Error(error);
 // console.log(body);
});
//retrieve user
app.get('/users', (req, res) => {
  User
    .find()
    .then(users => {
      res.json({
        users: users.map(
          (user) => user.serialize())
    });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});
//create new user
app.post('/users', (req, res) => {
    console.log('post ran')
    const requiredFields = ['username', 'password', 'email'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Please enter all requested information`
            console.error(message);
            return res.status(400).send(message);
        }
    }
        User
        .create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        .then(user => res.status(201).json(user.serialize()))
        .catch(err => {
        console.error(err);
       res.status(500).json({error: 'Something went wrong'});
    }); 
    });    
    //retrieve user
    app.get('/users', (req, res) => {
        db.users.findOne({username: this.Username}),  
            function(err, users) {
                let context = {
                    user: user.map(function(user) {
                        return {
                            username: users.username,
                            password: users.password,
                            email: users.email,
                        }
                    })
                }
            }

    });
//update user

app.put('/users/:id', function(req, res) {


    if (!(req.params.id && req.body.id&& req.params.id === req.body.id)) {
        const message = (`information is not a match`);
        console.error(message);
        return res.status(400).json({message: message});
    }
    const toUpdate = {};
    const updateableFields = ['username', 'password', 'email'];

    updateableFields.forEach(field => {
        if (field in req.body) {
          toUpdate[field] = req.body[field]
        }
    });

    User
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .then(user => res.status(204).end()) 
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});
//delete user
app.delete('/users/:id', function(req, res) {
  User
    .findByIdAndRemove(req.params.id)
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
  });

      app.use('*', function(req, res) {
      res.status(404).json({message: 'Not Found'});
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
          runServer(DATABASE_URL).catch(err =>
              console.error(err));
      }

      module.exports = {runServer, app, closeServer};