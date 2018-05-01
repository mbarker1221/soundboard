'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

const {User} = require('./models');
const {router} = require('./userRouter');

module.exports = {User, router};
