const express = require('express');
const userRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {User} = require('./models');

userRouter.get('/', (req, res) => {
  res.json(User.get());
});

module.exports = userRouter;

