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
console.log(User.create);
//var MongoSessionStore = require ('session-mongoose')(require('connect'));
//var sessionStore = new MongoSessionStore({ url:
//  credentials.mongo[app.get('env')].connectionString});

//app.use(require('cookie-parser')(credentials.cookieSecret));
//app.use(require('express-session')({
//  resave: false,
//  saveUninititalized: false,
//  secret: credentials.cookieSecret,
//  store: sessionStore,
//}));

const request = require("request");

app.get('/event', (req, res) => {
  const event = 
    {
      method: 'GET',
      url: 'http://api.eventful.com/json/events/search',
      qs:
      {
        app_key: 'c7nd5jGWK8tkcThz', 
        keywords: 'music',
     location: 'atlanta',
     date: 'future',
       // include: 'venue_name', 'start_time', 'title', 'city_name', 'description'
      },
        headers: 
        {
          'Postman-Token': 'e3ab5da1-1f81-7c89-38a6-5e1e4596074d',
          'Cache-Control': 'no-cache',
          Authorization: 'Basic bWJhcmtlcjEyMjFAZ21haWwuY29tOnNob21waW4x' 
        } 
    };

    rest.get('/event', function(req, content, cb) {
      Event.find({approved:true}), function(err, events) {
        if(err) return cb({error: 'internal'});
        cb(null, events.map(function(a){
          return {
            name: a.title,
            description: a.description,
            city_name: a.city_name,
            start_date: a.start_date,
          };
        }));
      };
  }); 
request(event, function (error, response, body) {
  if (error) throw new Error(error);
  res.json(JSON.parse(body));
})
  console.log(event)
  
});
function getArtist() {
app.get('/artist', (req, res) => {
  const artist = 
    {
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

//search  by location

app.get('/location', (req, res) => {
  const location = 
    {
      method: 'GET',
      url: 'http://api.songkick.com/api/3.0/search/locations.json',
      qs: {query: req.query.location,    
      apikey: 'ovLum2i3CCGRjtHA'},
      headers: 
        {
          'Postman-Token': '1731f7bf-5025-71b8-d814-3ed821e42a47',
          'Cache-Control': 'no-cache'
        } 
      };
    request(location, function (error, response, body) {
      if (error) throw new Error(error);
        res.json(JSON.parse(body));
      })
  });

 //retrieve user
app.get('/users', (req, res) => {
    const filters = {};
    const queryableFields = ['username', 'email'];
    queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
    });
       User
        .find(filters)
        .then(Users => res.json(
            Users.map(user=> user.serialize())))
            console.log(User)
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
});
//create new user
app.post('/users', (req, res) => {

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
      email: req.body.email})
    .then(
      user => res.status(201).json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});
//update user
app.put('/users', function(req, res) {
    db.users.findOne({username: this.username}),
        function(err, users) {
            let context = {
                user: user.map(function(user) {
                    return {
                        username: this.username,
                        password: this.password,
                        email: this.email,}
                })
            }
        }
    if (!(req.params.username && req.body.username && req.params.username === req.body.username)) {
        const message = (`information is not a match`);
        console.error(message);
        return res.status(400).json({
            message: message
        });
    }
    const toUpdate = {};
    const updateableFields = ['username', 'password', 'email'];

    updateableFields.forEach(field => {
        if (field in req.body) {
          toUpdate[field] = req.body[field]
        }
    });
    User
        .findByUsernameAndUpdate(req.params.username, {$set: toUpdate})
        .then(user => res.status(204) 
        .catch(err => res.status(500).json({
                message: 'Internal server error'
            }))
        )
});
//delete user
app.delete('/users', function(req, res) {
  User
    .findByIdAndRemove(req.params.id)
    .then(user => res.render('end')
    .catch(err => res.status(500).json
      ({message: 'Internal server error'})))
  })
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


