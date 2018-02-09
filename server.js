
'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');



const {Events} = require('/models.js');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/events', pageRouter.js);


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


let server;

function runServer(url, port = PORT) {
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

module.exports = {runServer, app, closeServer};


