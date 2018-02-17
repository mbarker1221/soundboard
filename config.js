const futureUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location=atlanta&date=future";
const locationUrl = "http://api.songkick.com/api/3.0/search/locations.json?query={}&apikey=ovLum2i3CCGRjtHA";
const artistUrl = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=the+pixies";
//const venuesUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&q=music&l=30032&within=50&units=miles";
const usersList = "http://api.eventful.com/json/users/search?app_key=c7nd5jGWK8tkcThz&keywords=user";
const searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";

const eventfulApiKey = "c7nd5jGWK8tkcThz";
const songkickApiKey = "ovLum2i3CCGRjtHA";
const oAuthConsumerKey = "e6cbb961ca8fed6a95ed";
const oAuthConsumerSecret = "7944db20d8d3f4d8c56f";

const {event} = require ('./models');
const {eventsRouter} = require ('./eventsRouter');
const {userRouter} = require ('./userRouter');
const {user} = require ('./models');

module.exports = {event, userRouter, eventsRouter, user};

module.exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/userData";
module.exports.PORT = process.env.PORT || 8080;

//module.exports.JWT_SECRET = [process.env.JWT_SECRET;
//module.exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
//module.exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-soundboard';

