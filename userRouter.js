const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {User} = require('./models');




router.get('/', (req, res) => {
  res.json(User.get());
});

//CREATE 

router.post('/', jsonParser, (req, res) => {
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

//DELETE BY username

router.delete('/:username', (req, res) => {
  User.delete(req.params.username);
  console.log(`Deleted user \`${req.params.username}\``);
  res.status(204).end();
});
 
 //UPDATE

router.put('/username', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email',];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` .`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.username !== req.body.username) {
    const message = (
      `Username info must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating user \`${req.params.username}\``);
  const updatedInfo = User.update({
    username: req.body.username,
    passsword: req.body.password,
    email: req.body.email
  });

res.status(204).end();
})

module.exports = router;

