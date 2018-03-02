const express = require('express');
const app = express();
const {DATABASE_URL,PORT} = require('./config');
const {User} = require ('./models');
const {Event} = require ('./eventsRouter');
const {Artist} = require ('./eventsRouter');
const eventsRouter = require('./eventsRouter');
const userRouter=require('./userRouter')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/user/index.html');
});

app.get('/user', (req,res) => {
  res.json(User.get());
});

app.get('/user', (req, res) => {
  User
    .find()
    .then(User => {
      res.json(User.map(User => User.serialize()));
    })
   .catch(err => {
    console.error(err);
     res.status(500).json({
        error: 'something is seriously wrong'
      });
    });
});

//create new user
app.post('/user', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
     User
     .create({
      username: req.body.username, 
      password: req.body.password, 
      email: req.body.email})
     res.status(201).json(User);
    });


app.put('/user/:id', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating User \`${req.params.id}\``);
  User.update({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  res.status(204).end();
});

app.delete('/user/:id', (req, res) => {
   console.log(`Deleted User \`${req.params.id}\``);
    User
     .delete(
      req.params.id),
     res.status(201).json(User);
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