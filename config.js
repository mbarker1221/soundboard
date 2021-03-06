'use strict';
exports.DATABASE_URL=process.env.DATABASE_URL || global.DATABASE_URL || "mongodb://localhost/user";
//mbarker1221:shompin1@ds131698.mlab.com:31698/users";
//exports.TEST_DATABASE_URL=process.env.TEST_DATABASE_URL || global.TEST_DATABASE_URL || "mongodb://localhost/users";
//mbarker1221:shompin1@ds131698.mlab.com:31698/mockUsers";
exports.PORT=process.env.PORT || 8080;
exports.JWT_SECRET="C20FE91EBF6958C4C6E673A23C58C3AB6B55C5A768FB0E245B511DB203C2A019";
exports.JWT_EXPIRY=process.env.JWT_EXPIRY || '7d';
exports.base=process.env.base || "mongodb://localhost:8080/ds131698.mlab.com:31698/users";
exports.serverBase=process.env.serverBase || "http://localhost:8080/users";
exports.clientBase=process.env.clientBase || "mongodb://localhost:8080/mbarker1221:shompin1@ds131698.mlab.com:31698/users";
exports.USER_URL=process.env.USER_URL || "./server";
exports.EVENT_URL=process.env.EVENT_URL || "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
exports.ARTIST_LIST_URL=process.env.ARTIST_LIST_URL || "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=";
exports.ARTIST_URL=process.env.ARTIST_URL || "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
exports.ALL_URL=process.env.ALL_URL || "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music";
exports.searchSimilar=process.env.searchSimilar || "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";
exports.events=process.env.events || "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=P0-001-000034547-0";
exports.similar=process.env.similar || "http://api.eventful.com/json/performers/get?c7nd5jGWK8tkcThz&id=P0-001-000000045-2";

