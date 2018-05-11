'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const {User} = require('./users');

const {router: userRouter} = require('./users/userRouter');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;
const app = express();
const MongoClient = require('mongodb').MongoClient;
//mongoose.connect("mongodb://localhost:8080/users");
mongoose.connect("mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users");

const {PORT, DATABASE_URL} = require('./config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();


app.use(express.json());

app.use(morgan('common'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  if (req.type === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/user/', userRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use(express.static('public'));
/*
app.get('/', (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
});
*/
app.post("/users", (req, res) => {
   const user = 
     User.create({username: req.body.username, password: req.body.password, email: req.body.email
     })
  //var userData = new User(req.body);
  //userData.save()
    .then(user => {
      res.send("user saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
app.post('/user', jsonParser, (req, res) => {
  /*const requiredFields = ["username", "password", "email"];
      for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
      return res.status(400).send(message);
      }
    }*/
   const user = 
     User.create({username: req.body.username, password: req.body.password, email: req.body.email
     })
    .then(user => res.status(201).json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error"});  
    });
});

app.get('/user', (req, res) => {
    const filters = {};
    const queryableFields = ["username", "password"];
      queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
      });
    User
      .find(filters)
      .then(User => res.json(
          User.map(user => user.serialize())
      ))
      .catch(err => {
        console.error(err);
        res.status(500).json({message: "something is seriously wrong"});
        return this.users.find(user => user.id === id);
      });
});

app.put('/user/:id', (req, res) => {  
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['name', 'password', 'email'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: "Internal server error"}));
});

  app.delete('/user/:id', (req, res) => {
    console.log(`Deleted User \`${req.params.id}\``);
      User
       .findByIdAndRemove(req.params.id)
       .then(user => res.status(204).end())
       .catch(err => res.status(500).json({message: "Internal server error"}));
  });

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

process.on('unhandledRejection', (reason, promise) => {
console.error(reason, 'Unhandled Rejection at Promise', promise);
 })
.on('uncaughtException', err => {
 console.error(err, 'Uncaught Exception thrown');
process.exit(1);
 });


let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
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
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
