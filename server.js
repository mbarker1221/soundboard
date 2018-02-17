const express = require('express');
var app = express();

const handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8080);
app.use(express.static('public'));


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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

app.use(morgan('common'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('register');
});

app.post('/user', (req, res) => {
    const requiredFields = ['username', 'password', 'email'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Please enter all requested information`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    User
        .create({
            username: req.body.username,
            password: req.cookie.password,
            email: req.body.email
        })
        .then(user => res.status(201).json(user.serialize()))
        .catch(err => {
        console.error(err);
        res.status(500).json({
            error: 'Something went wrong'
        });

        res.render('search');
    });

    app.get('event', function(req, res) {
        res.render('event_result');
    })

    app.get('/user', (req, res) => {
        db.users.findOne({username: this.Username}),  
            function(err, users) {
                let context = {
                    user: user.map(function(user) {
                        return {
                            username: user.username,
                            password: user.password,
                            email: user.email,
                        }
                    })
                }
            }
    });
      User
        .find()
        .then(users => {res.json(user => user.serialize())
                
      .catch(err => {
    console.error(err);
    res.status(500).json({
        error: 'did not retrieve'
    })
}) 
res.render('search');
});

app.put('/user', function(req, res) {
  res.render('profile');
    db.users.findOne({username: this.Username}),
        function(err, users) {
            let context = {
                user: user.map(function(user) {
                    return {
                        username: user.username,
                        password: user.password,
                        email: user.email,
                    }
                })
            }
        }

    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
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
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .then(user => res.status(204) 
        .catch(err => res.status(500).json({
                message: 'Internal server error'
            }))
        )
        res.render('search')
});

app.delete('/user', function(req, res) {
  User
    .findByIdAndRemove(req.params.id)
    .then(user => res.render('end')
    .catch(err => res.status(500).json
      ({message: 'Internal server error'})))
  })
res.render('end');
  });

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