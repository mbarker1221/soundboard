const express = require('express');
const userRouter = express.Router();
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();
const {User} = require ('./models');

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

router.get('/user', (req,res) => {
  res.json(User.get());
});

router.get('/user', (req, res) => {
  User
    .find()
    .then(user => {
      res.json(users.map(user => user.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'something is seriously wrong'
      });
    });
});

router.post('/user', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  };
    User
    .create({
       username: req.body.username,
       password: req.body.password,
       email: req.body.email
    })
    .then(
      user => res.status(201).json(user.serialize()))
    .catch(err => {
      console.error(err);
      res/statis(500).json({message: 'internal error'});
    });
  });
  
router.put('/user/:id', jsonParser, (req, res) => {
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
  console.log(`Updating user \`${req.params.id}\``);
  User.update({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  res.status(204).end();
});

router.delete('/user/:id', (req, res) => {
  User.delete(req.params.id);
  console.log(`Deleted user \`${req.params.ID}\``);
  res.status(204).end();
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'})
 });

const UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String},
  email: {type: String}
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email
  };
}

module.exports = {User, router, userRouter, UserSchema};
