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
    const stringFields=['username', 'password'];
    const nonStringField = stringFields.find (
      field => field in req.body && typeof req.body[field] !=='string');

    if(nonStringField) {
      return res.status(433).json({code: 422, 
        reason: 'ValidationError',
        message: 'Incorrect field type',
       location: nonStringField
     })
  }
  const trimmedFields = ['username', 'password', 'email'];
  const nonTrimmed = trimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
    );
  if (nonTrimmed) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmed
    });
  }
const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(field =>
      'min' in sizedFields[field] &&req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(field =>
      'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max
  );
 if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, email = ''} = req.body;
return User.find({username})
    .count()
    .then(count => {
      if (count > 0) {
      
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
     
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
        email,
       
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
  };


userRouter.get('/', (req, res) => {
  return User.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};


  const info = User.create(
    req.body.username, req.body.password, req.body.email);
  res.status(201).json(info);
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

