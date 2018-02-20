const express = require('express');
const userRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {user} = require('./models');

User.create({
	"username": "me",
	"password": "122345",
	"email": "email@email.com"
});


userRouter.get('/user', (req, res) => {
  res.json(User.get());
});



userRouter.post('/user', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['username', 'password', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
        if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const detail = User.create(req.body.username, req.body.password, req.body.email);
  res.status(201).json(detail);
});


userRouter.delete('/:id', (req, res) => {
  User.delete(req.params.id);
  console.log(`Deleted user \`${req.params.ID}\``);
  res.status(204).end();
});

userRouter.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
      if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating user \`${req.params.id}\``);
  const updatedUser = User.update({
    id: req.params.id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  res.status(204).end();
})

module.exports = userRouter;

