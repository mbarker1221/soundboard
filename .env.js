//NODE_ENV=development
//MONGO_HOST="mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users";
//MONGO_PORT=27017
MONGO_DBNAME = users

DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || "mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users";
TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || global.TEST_DATABASE_URL || "mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/userdata";
PORT = process.env.PORT || 8080;
JWT_SECRET = "C20FE91EBF6958C4C6E673A23C58C3AB6B55C5A768FB0E245B511DB203C2A019";
JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
const serverBase = "http://localhost:8000";
const USER_URL = serverBase + './index.js';
const EVENT_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
const ARTIST_Events_URL = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=";
const ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
const ALL_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music";
const searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";
const events = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=P0-001-000034547-0";
const similar = "http://api.eventful.com/json/performers/get?c7nd5jGWK8tkcThz&id=P0-001-000000045-2";