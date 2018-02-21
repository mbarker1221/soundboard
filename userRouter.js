const express = require('express');
const userRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {User} = require('./models');

userRouter.post('/users', jsonParser, (req, res) => {
    console.log('post ran')
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
  password: req.body.password, 
  email: req.body.email
})
 .then(user => res.status(201).json(user.serialize()))
 .catch(err => {
  console.error(err);
  res.status(500).json({message: 'error'});
 });
});




userRouter.get('/users', (req, res) => {
  res.json(User.get());
});

/*
userRouter.delete('/:id', (req, res) => {
  user.delete(req.params.id);
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
  const updatedUser = user.update({
    id: req.params.id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  res.status(204).end();
})
*/
module.exports = userRouter;

