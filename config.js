"use strict";

const futureUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location=atlanta&date=future"
const eventUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location=atlanta&date=future"
const placeUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&q=music&l=30032&within=50&units=miles";
const artistUrl = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=the+pixies";
const venuesUrl = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&q=music&l=30032&within=50&units=miles";
const usersList = "http://api.eventful.com/json/users/search?app_key=c7nd5jGWK8tkcThz&keywords=user";
const usersAttending = "http://api.eventful.com/json/events/going/list?app_key=c7nd5jGWK8tkcThz&id=E0-001-000213902-2";

const apiKey = "c7nd5jGWK8tkcThz";
const oAuthConsumerKey = "e6cbb961ca8fed6a95ed";
const oAuthConsumerSecret = "7944db20d8d3f4d8c56f";

const {event} = require ('models.js');
const {router} = require ('router.js');

module.exports = {event, router};


