const eventUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location=atlanta&date=future"
const placeUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&q=music&l=30032&within=50&units=miles";
const artistUrl = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=the+pixies";
const venuesUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&q=music&l=30032&within=50&units=miles";
const usersList = "http://api.eventful.com/json/users/search?app_key=c7nd5jGWK8tkcThz&keywords=user";
const usersAttending = "http://api.eventful.com/json/events/going/list?app_key=c7nd5jGWK8tkcThz&id=E0-001-000213902-2";

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL,PORT} = require('./config');
const {User} = require('./models');
const {Event} = require('./models');
const {Location} = require('./models');
const userRouter = require('./userRouter');
const eventRouter = require('./eventsRouter');
const app = express();

const handlebars =require('express-handlebars')
.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/custom-layout', function(req, res) {
  res.render('/custom-layout', {layout: 'custom'});
});

app.get('/Event', (req, res) => {
    const filters = {};
    const queryableFields = ['artist_name', 'city_name'];
    queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
      });
    Event
        .find(filters)
        .then(Events => {res.json(
          Events.map(event => event.serialize()))
          })
       .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
});

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
         res.status(500).json({error: 'did not retrieve'})
      });
      
})

app.get('/users/:id', (req, res) => {
   User
      .findById(req.params.id)
      .then(user => res.json(user.serialize()))
      .catch(err => {
        console.error(err);
         res.status(500).json({error: 'did not retrieve'});
      });
});

app.post('/user', (req, res) => {
  const requiredFields = ['username', 'password','email'];
   for (let i = 0; i <requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message =`Please fill out all information`
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

app.put('/user/:id', (req,res) => {
   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({message: message});
  } 
   const toUpdate = {};
  const updateableFields = ['username', 'password', 'email'];

updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

app.delete('/users/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

app.use('*', function(req, res) {
   res.status(404).json({message: 'Not Found'});
});

let server

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