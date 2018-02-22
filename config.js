const {event} = require ('./models');
const {eventsRouter} = require ('./eventsRouter');
const {userRouter} = require ('./userRouter');
const {User} = require ('./models');

module.exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || global.TEST_DATABASE_URL || 'mongodb://localhost/TEST_DATABASE-URL';
exports.PORT = process.env.PORT || 8080;
//module.exports.JWT_SECRET = [process.env.JWT_SECRET;
//module.exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';


