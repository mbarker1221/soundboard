/*jshint esversion: 6 */
/*jshint node: true */
var serverBase="http://localhost:8080/user";
var clientBase = "mongodb://localhost:8080/mbarker1221:shompin1@ds131698.mlab.com:31698/users";
var base="http://mongodb:localhost:8080/ds131698.mlab.com:31698/users";
var DATABASE_URL = "mbarker1221:shompin1@ds131698.mlab.com:31698/users";
var USER_URL = "./server";
var db = "http://mongodb://ds131698.mlab.com:31698/users";
var db2 = "mongo//ds131698.mlab.com:31698/users -u mbarker1221 -p shompin1";
var db3 = "mongodb://127.0.0.1:27017";
var db4 = "pid=14955 port=27017 dbpath=/data/db 64-bit host=Callys-MBP";
var db5 = "% nc -w 3 -v ds31698.mlab.com:27107/users";
var db6 = "mongodb://ds131698.mlab.com:31698/users";
var db7 = "mongod --dbpath 'C:/data/db'";


var EVENT_URL="http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
var ARTIST_LIST_URL = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=";
var ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
var ALL_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music";
var searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";
var events = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=P0-001-000034547-0";
var similar = "http://api.eventful.com/json/performers/get?c7nd5jGWK8tkcThz&id=P0-001-000000045-2";


function hideUnusedSections() {
  $("#landing_page").hide();
  $("#artist_results_page").hide();
  $("#event_results_page").hide();
  $("#sign_up_page").hide();
  $("#sign_in_page").hide();
  $("#profile_page").hide();
  $("#deletePage").hide();
}

function renderPage() {
   hideUnusedSections();
   $("#landing_page").show();
}

function toggleSignUp() {
 hideUnusedSections();
  $("#sign_up_page").show();
}

function toggleSignIn() {
  hideUnusedSections();
  $("#sign_in_page").show();
}

function toggleArtist() {
hideUnusedSections();
  $("#artist_results_page").show();
  getArtist();
}

function getArtist() {
  event.preventDefault();
  const artist_name = $("input[name=artistSearch]");
  const art = artist_name.val();

  var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": ARTIST_URL + art,
    "type": "GET",
    "headers": {
      "Cache-Control": "no-cache",
    }
  };
  
  $.ajax(settings).done(function(response) {
    showArtist(response);
  });
}

function showArtist(results) {
  $("#artistSearch").val('');
  var id = results.performers.performer[0].url;
  $("#id").text(id);
  var name = results.performers.performer[0].name;
  $("#name").text(name);
}

function toggleEvents() {
hideUnusedSections();
$(".event_results_page").show();
getEvents();
}


function getEvents() {
  var locate = $("input[name=eventSearch]");
  var loc = locate.val();
  var params = {
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": EVENT_URL + loc,
    "type": "GET",
    "headers": {
      "Cache-Control": "no-cache"
    }
  };
  
  $.ajax(params).done(function(response) {
    showEvents(response);
  });
}

function showEvents(results) {
  $("#eventSearch").val('');
  var title = results.events.event[0].title;
  $(`#title`).text(title);
  var city = results.events.event[0].city_name;
  $(`#city_name`).text(city);
  var start_time = results.events.event[0].start_time;
  $(`#starts`).text(start_time);
  var venueE = results.events.event[0].venue_name;
  $(`#venueE`).text(venueE);
  var address = results.events.event[0].venue_address;
  $(`#address`).text(address);
 
  var title2 = results.events.event[1].title;
  $(`#title2`).text(title);
  var city2 = results.events.event[1].city_name;
  $(`#city_name2`).text(city);
  var start_time2 = results.events.event[1].start_time;
  $(`#starts2`).text(start_time);
  var venueE2 = results.events.event[1].venue_name;
  $(`#venueE2`).text(venueE);
  var address2 = results.events.event[1].venue_address;
  $(`#address2`).text(address);

  var title3 = results.events.event[2].title;
  $(`#title3`).text(title);
  var city3 = results.events.event[2].city_name;
  $(`#city_name3`).text(city);
  var start_time3 = results.events.event[2].start_time;
  $(`#starts3`).text(start_time);
  var venueE3 = results.events.event[2].venue_name;
  $(`#venueE3`).text(venueE);
  var address3 = results.events.event[2].venue_address;
  $(`#address3`).text(address);
}

function toggleNewUser() {
var uN = $("input[name=username]").val();
  var pW = $("input[name=password]").val();
  var eM = $("input[name=email]").val();
  handleNewUser(uN, pW, eM);
}

function handleNewUser(uN, pW, eM) {
  var newUser = {
  "username": uN,
  "password": pW,
  "email": eM 
  }
  postNewUser(uN, pW, eM);
}

function postNewUser(uN, pW, eM) {
  $.ajax({
    type: 'POST',
    url: serverBase,
    crossDomain: true,
    data: {
      "username": uN,
      "password": pW,
      "email": eM
    },
    dataType: 'json',

     success: function(data, textStatus, xhr) {
      displayProfile(data);
    },
    complete: function(data, xhr, textStatus) {
      displayProfile(data);
    } 
});
}

function displayProfile(data) {
  hideUnusedSections();
  $('#profile_page').show();
  handleHello();
}
 
function handleHello() {

  $(`#hello`).text(this[newUser.username]);

  $(`#appMail`).text(this[newUser.email]);
}

function toggleOldUser() {
hideUnusedSections();
  $(".profile_page").show();
  handleOldUser();
}

function handleOldUser() {
  var usnm = $("input[name=un]").val();
  var pasw = $("input[name=pw]").val();
  getOldUser();
}

function getOldUser(usnm, pasw) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "serverBase",
    "type": "GET",
    "dataType": "json",
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    "processData": false,
    "data": {
      "username": usnm,
      "password": pasw
    }
  };
}

function displayProfile(response) {
  hideUnusedSections();
  $('#profile_page').show();
}

function updateUser() {
  var userId = this.User[user.id];
  var usern = $("input[name=updateUN]").val();
  var passw = $("input[name=updatePASS]").val();
  handleUpdate(userId, usern, passw);
}

function handleUpdate(userId, usern, passw) {

  $.ajax({
    type: "PUT",
    url: USER_URL + "/" + userId,
    dataType: "json",
    contentType: "application/json",
    data: {
      "username": usern,
      "password": passw
    },
    success: function (User) {
      console.log(response);
      storeUser();
    },
    error: function () {
      alert('Error!');
    }
  });
}

function deleteUser() {
  $('.deletePage').show();
  console.log("deleting user");
  var UserId = this.User[user.id];

  $.ajax({
    type: "DELETE",
    url: USER_URL + "/" + UserId,
    dataType: "json",
    contentType: "application/json",

    success: function () {
      hideUnusedSections();
      
      alert("Success!");
    },

    error: function () {
      alert("Error!");
    }
  });
}
$ (window).on("load", function() { 
  hideUnusedSections();
  renderPage();
   $("body").removeClass("preload");
});





