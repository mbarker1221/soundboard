const futureUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location={location}&date=future";
const locationUrl = "http://api.songkick.com/api/3.0/search/locations.json?query={}&apikey=ovLum2i3CCGRjtHA";
const artistUrl = "http://api.songkick.com/api/3.0/search/artists.json?apikey=ovLum2i3CCGRjtHA&query={artist_name}";
const searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";

const eventfulApiKey = "c7nd5jGWK8tkcThz";
const songkickApiKey = "ovLum2i3CCGRjtHA";
const oAuthConsumerKey = "e6cbb961ca8fed6a95ed";
const oAuthConsumerSecret = "7944db20d8d3f4d8c56f";

const {event} = require ('./models');
const {eventsRouter} = require ('./eventsRouter');
const {userRouter} = require ('./userRouter');
const {user} = require ('./models');

module.exports = {event, eventsRouter, user, userRouter};

module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users';
	
module.exports.PORT = process.env.PORT || 8080

//module.exports.JWT_SECRET = [process.env.JWT_SECRET;
//module.exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';


