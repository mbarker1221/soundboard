
'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {seed.data.json, PORT} = require('/config');
const {User} = require('/models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  User
    .find()
    .then(posts => {
      res.json(users.map(post => user.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.get('/user/:id', (req, res) => {
   User
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

app.post('/users', (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
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


app.delete('/user/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


app.put('/users/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['username', 'password', 'email'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updatedUser => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});


app.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted user with id \`${req.params.id}\``);
      res.status(204).end();
    });
});


app.use('*', function (req, res) {
  res.status(404).json({message: 'Not Found'});
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
  runServer(/seed.data.json).catch(err => console.error(err));
}

module.exports = {runServer, app, closeServer};







'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const {Events} = require('/models.js');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('/public'));
app.use('/events', pageRouter.js);



function fetchArtistData() {
  let location = $('input[name=city_name]');
  let performer = $('input[name=title]');

  const city_name = location.val();
  const title = performer.val();

  let params = {
    city : city_name,
    artist : title
  };

$.getJSON(eventUrl, params, function(data){
  showArtistData(data);
});

function showEvents() { 
  var oArgs = {
         app_key:"c7nd5jGWK8tkcThz",            
         id: "20218701",
         page_size: 25 ,
  };

  EVDB.API.call("/events/get", oArgs, function(oData) {
  });
}

function searchShows() {
  var oArgs = {
      app_key: "c7nd5jGWK8tkcThz",
      q: "music",
      where: "Atlanta", 
      "date": "2013061000-2015062000",
      page_size: 5,
      sort_order: "popularity",
   };

 EVDB.API.call("/events/search", oArgs, function(oData) {   
    });
}


