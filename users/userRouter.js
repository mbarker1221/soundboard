'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const {User} = require('./models');
const router = express.Router();

const app = express();
const config = require('../config');
const jsonParser = bodyParser.json();

app.use(bodyParser.json());

router.post('/', jsonParser, (req, res) => {
   const requiredFields = ["username", "password", "email"];
   const missingField = requiredFields.find(field => !(field in req.body));

   if (missingField) {
     return res.status(422).json({
        code: 422,
         reason: "ValidationError",
        message: "Missing field",
        location: missingField
      });
   }

const stringFields = ["username", "password", "email"];
const nonStringField = stringFields.find(
   field => field in req.body && typeof req.body[field] !== "string"
);

   if (nonStringField) {
      return res.status(422).json({
         code: 422,
         reason: "ValidationError",
         message: "Incorrect field type: expected string",
         location: nonStringField
      });
   }
   const explicityTrimmedFields = ["username", "password"];
   const nonTrimmedField = explicityTrimmedFields.find(
      field => req.body[field].trim() !== req.body[field]
   );

   if (nonTrimmedField) {
      return res.status(422).json({
         code: 422,
         reason: "ValidationError",
         message: "Cannot start or end with whitespace",
         location: nonTrimmedField
      });
   }
   /* function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
*/
   const sizedFields = {
      username: {
         min: 4
      },
      password: {
         min: 4,
         max: 25
      }
   };
   const tooSmallField = Object.keys(sizedFields).find(field =>
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
//router.get('/', (req, res) => {
// res.json(User.get());
//});
/*
router.get('/', (req, res) => {
  return User.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});
*/

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
            res.status(500).json({message: "did not find user"});
        });
});

app.get('/user/:id', (req,res) => {
  const {userId} = req.params;
});
/*
app.post('/user', (req, res) => {
  const requiredFields = ['username', 'password', 'email'];

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
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
      res.status(500).json({message: 'Did not create'});
    });
});
*/

router.put('/users/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({message: message});
  }
  const toUpdate = {};
  const updateableFields = ['username', 'password'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Did not update'}));
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

router.delete('/users/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Did not delete'}));
});

module.exports = {router};