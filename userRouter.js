const express = require('express');
const userRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {user} = require('./models');

userRouter.get('/', (req, res) => {
  res.json(user.get());
});

module.exports = userRouter;

