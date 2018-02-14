const express = require('express');
const userRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {User} = require('./models');

userRouter.get('/', (req, res) => {
  res.json(User.get());
});

//CREATE 

userRouter.post('/', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const info = User.create(
    req.body.username, req.body.password, req.body.email);
  res.status(201).json(info);
});


//DELETE BY id

userRouter.delete('/:id', (req, res) => {
  User.delete(req.params.id);
  console.log(`Deleted user \`${req.params.id}\``);
  res.status(204).end();
});
 
 //UPDATE

userRouter.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email',];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` .`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Id must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating user \`${req.params.id}\``);
  const updatedInfo = User.update({
    id: req.params.id,
    username: req.body.username,
    passsword: req.body.password,
    email: req.body.email
  });

res.status(204).end();
})

module.exports = userRouter;

