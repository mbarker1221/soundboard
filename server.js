//'use strict';
/*jshint esversion: 6 */
/*jshint node: true */
//const uuid = require('uuid');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const {User} = require('./users/index');
//var y = require('events').EventEmitter.prototype._maxListeners = 100; 
const {router: userRouter} = require('./users/router');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;
const app = express();
mongoose.connect("mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users");

const {PORT, DATABASE_URL} = require('./config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const jsonParser = bodyParser.json();

app.use(express.json());

app.use(morgan('common'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  if (req.type === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', userRouter);
app.use('/api/user', userRouter);
app.use('/api/auth/', authRouter);
app.use(express.static('public'));

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});


app.get('/', (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
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
      .then(user => res.json(user.map(User => User.serialize())))
      //.then(user => res.status(201).json(user.serialize()))
      //var id = require('mongodb').ObjectID
  
      .catch(err => {
        console.error(err);
        res.status(500).json({message: "something is seriously wrong"});
      });
});

app.post('/user', jsonParser, (req, res) => {

  User
  .create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })

  .then(User => res.status(201).json(User.serialize()))

  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'error'});
  });
  });

app.put('/user/:id', (req, res, next) => {
var id = User.findOne({}, {_id: 1})._id
  const toUpdate = {};
  const updateableFields = ['username', 'password'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
 
  User.findByIdAndUpdate({$set: toUpdate})
   //.then(User => res.status(204).end())
      .then(User => res.json(user.serialize()))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});



/*
app.put('/user/:id', jsonParser, (req, res) => {  
 // const {id} = req.params;
 const toUpdate = {};
  const updateableFields = ['username', 'password'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

User
  .findByIdAndUpdate(req.params.id, {$set: toUpdate})
  .then(user => res.json(user.serialize()))
  .catch(err => res.status(500).json({message: 'error'}));
});

/*
// the user would actually make a request
// to one of the IDs, like `/9920711`. `studentId`
// is accessible in the `req.params` object.
app.get('/:id', (req, res) => {
  // use destructuring assignment to adsign `req.params.studentId`
  // to its own variable
  const {userId} = req.params;
  let requestedData;
  // loop through studentData td find a matching studentId
  for (let i = 0; i<userData.length; i++) {
    if (userData[i].userId === userId) {
      requestedData = userData[i];
    }
  }
  // send the data matching the requested studentId
  res.json(requestedData);
});
*/

/*

app.delete('/users/:id', (req, res, next) => {
  const id = req.params.id;
  // Using promises
  User.findByIdAndRemove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch(next);
});
*/
  app.delete('/user/:id', (req, res) => {
      //const id = req.params.id;
      //  const {id} = req.params;
      User
       .findByIdAndRemove(req.params.id)
       .then(User => res.status(204).end())
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
  process.setMaxListeners(0);
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