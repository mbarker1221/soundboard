const express = require('express');
const app = express();
const {DATABASE_URL,PORT} = require('./config');
const {User} = require ('./userRouter');
const {Event} = require ('./eventsRouter');
const {Artist} = require ('./eventsRouter');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.use(morgan('common'));
app.use(bodyParser.json());
//app.use(express.static('public'));
//var $ = require ('jquery');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname) + './public/index.html');
});
 
app.get('/user', (req, res) => {
  User
    .find()
    .then(user => {
        res.json({user: user.map((user) => user.serialize())
      });
  })
    .catch(err => {
        console.error(err);
        res.status(500).json({
        error: 'something is seriously wrong'
      });
    });
});

app.get('/user/id', (req, res) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry'});
    });
});

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
        email: req.body.email
      })
      .then(user => res.status(201).json(user.serialize()));
      });


app.put('/user/:id', jsonParser, (req, res) => {

 if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
          console.error(message);
        return res.status(400).json({ message: message });
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
        .catch(err => res.status(500).json({message: 'Something went wrong'}));
    });

  app.delete('/user/:id', function(req,res){
    User
    .findByIdAndRemove(req.params.id)
    .then (user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'internal error'}));
  });

  app.use('*', function(req, res) {
      res.status(408).json({message: 'No Found'})
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