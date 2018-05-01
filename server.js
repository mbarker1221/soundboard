'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const app = express();
const {User} = require('./users/models');

app.use(express.json());
const {router: usersRouter } = require('./users/userRouter');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');
var MongoClient = require('mongodb').MongoClient;
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');


app.use(morgan('common'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.type === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
   });
});

//app.get('/', (req, res) => {
 //  res.sendFile(__dirname + "/public/index.html");
//}); 

app.use('*', function (req, res) {
  res.status(404).json({message: 'Other * error'});
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, 'Unhandled Rejection at Promise', promise);
   })
   .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
   });

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
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
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};






//app.get('/', (req, res) => {
  // res.sendFile(__dirname + "/public/index.html");
//}); 

//app.get('/', function (req, res) {
//   throw new Error('oh no!');
//});

//app.use(function (err, req, res, next) {
  // console.log(err.message);
//});
/*
app.use('*', (req, res) => {
   return res.status(404).json({message: 'Not Found'});
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, 'Unhandled Rejection at Promise', promise);
   })
   .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
   });

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
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
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
*/