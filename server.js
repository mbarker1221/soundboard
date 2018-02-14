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

const {DATABASE_URL, PORT} = require('./config');
const {User} = require('./models');
const {Events} = require('./models');
const userRouter = require('./userRouter');
const eventRouter = require('./eventsRouter');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/events', (req, res)=> {
    Event
        .find()
        .then(events => {
            res.json(events.map(event => event.serialize()));
        })
        .catch (err => {
        console.error(err);
        res.status(500).json({error: 'did not retrieve'});
    });
});

const events = [
    {
  title: {type: String},
  city_name: {type: String},
  venue_address: {type: String},
  start_time: {type: String},
   description: {type: String},
  provider: {type: String},
  event_url: {type: String},
    venue_name: {type: String},
    artist_name: {type: String},
    artist_url: {type: String},
}];

app.get('/user', (req, res) => {
    User
        .find()
        .then(user => {
            res.json(user.map(user => user.serialize()));
        })
        .catch (err => {
        console.error(err);
        res.status(500).json({error: 'did not retrieve'});
    });
});

app.get('/user/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => res.json(user.serialize()))
        .catch (err => {
        console.error(err);
        res.status(500).json({error: 'did not retrieve'});
    });
});

app.post('/user', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password', 'email'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    User
    .create({
        username:  req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    .then(user => res.status(201).json(user.serialize()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error:'wrong'});
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
        res.status(500).json({error: 'wrong'});

    });
});

app.put('/user/:id', (req, res) => {
    if (!(req.params.id&&req.body.id===req.params.id&&req.body.id)) {
        res.status(400).json({
            error: 'do not match'
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
    .catch (err => res.status(500).json({message: 'Something went wrong'}));
});

app.delete('/:id', (req, res) => {
        User
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted user`);
            res.status(204).end();
        });
    });

app.use('*', function(req, res) {
    res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {return reject(err);
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
    runServer(DATABASE_URL).catch (err => console.error(err));
}
    
module.exports = {runServer, app, closeServer};