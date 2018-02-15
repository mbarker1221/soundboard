const futureUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location=atlanta&date=future"

const eventfulApiKey = "c7nd5jGWK8tkcThz";
const songkickApiKey = "ovLum2i3CCGRjtHA";
const oAuthConsumerKey = "e6cbb961ca8fed6a95ed";
const oAuthConsumerSecret = "7944db20d8d3f4d8c56f";

const {Event} = require ('./models');
const {eventsRouter} = require ('./eventsRouter');
const {userRouter} = require ('./userRouter');
const {User} = require ('./models');

module.exports = {Event, userRouter, eventsRouter, User};

module.exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/userData";
module.exports.PORT = process.env.PORT || 8080;

//exports.JWT_SECRET = [process.env.JWT_SECRET;
//exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

//exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-soundboard';

