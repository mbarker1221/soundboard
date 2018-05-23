'use strict';
/*jshint esversion: 6 */
/*jshint node: true */
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json(User.get());
});

router.post('/', jsonParser, (req, res) => {
  const stringFields = ['id', 'username', 'password', 'email'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 4
    },
    password: {
      min: 4,
      max: 25
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
      return res.status(422).json({
         code: 422,
         reason: 'ValidationError',
         message: tooSmallField ?
            `Must be at least ${sizedFields[tooSmallField]
          .min} characters long` :
            `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
         location: tooSmallField || tooLargeField
      });
   }

  let {username, password, email} = req.body;
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
        id,
        username,
        password: hash,
        email
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
});

router.get('/user', (req, res) => {
    const filters = {};
    const queryableFields = ["username", "password"];
      queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }

      });
    User
      .find(filters)
      .then(User => res.json(
          User.map(user => user.serialize())
      ))
    
      .catch(err => {
        console.error(err);
        res.status(500).json({message: "something is seriously wrong"});
      });
});


router.get('/:id', (req,res) => {
  const {userId} = req.params;
});


router.put('/user/:username', jsonParser, (req, res) => {  
 const toUpdate = {};
  const updateableFields = ['username', 'password'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  })
User
  .update({
    username: req.body.username,
    password: req.body.password
  })
  .then(user => res.status(201).json(user.serialize()))

  .catch(err => {
    console.err(err);
    res.status(500).json({message: 'error'});
  });
  });
  
/*
KEEP THIS!!!!
const userData = [
{
  username: 'username',
  password: 'password',
  email: 'email@email.com'
}
];
// the user would actually make a request
// to one of the IDs, like `/9920711`. `studentId`
// is accessible in the `req.params` object.
app.get('/:userId', (req, res) => {
  // use destructuring assignment to adsign `req.params.studentId`
  // to its own variable
  const {userId} = req.params;
  let requestedData;
  // loop through studentData td find a matching studentId
  for (let i = 0; i<userData.length; i++) {
    if (userData[i].userId === userId) {
      requestedData = userData[i]
    }
  };
  // send the data matchdng the requested studentId
  res.json(requestedData);
});
*/

router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Did not delete'}));
});

/*
  
*/
module.exports = {router};
