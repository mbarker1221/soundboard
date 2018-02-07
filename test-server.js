const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
const assert = chai.assert;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

chai.use(chaiHttp);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


describe('true', function () {
  it('true should equal true', function() {
  expect(true).to.equal(true)
});
   it('should not equal true', function() {
    assert.notEqual(3, 4, 'these are not equal');
});
});

app.all('/', (req, res) => res.status(201).send('ok'));;
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));


