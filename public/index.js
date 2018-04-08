/*jshint esversion: 6 */
const serverBase = "http://localhost:8000";
const USER_URL = serverBase + "./server.js";
const EVENT_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
const ARTIST_Events_URL = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=";
const ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
const ALL_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music";
const searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";
const events = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=P0-001-000034547-0";
const similar = "http://api.eventful.com/json/performers/get?c7nd5jGWK8tkcThz&id=P0-001-000000045-2";
// "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";


function hideUnusedSections() {
  $("#landing_page").hide();
  $("#search_page").hide();
  $("#artist_results_page").hide();
  $("#event_results_page").hide();
  $("#sign_up_page").hide();
  $("#sign_in_page").hide();
  $('#profile_page').hide();
  $("#sUsIpage").hide();
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
function renderSearchPage() {
  hideUnusedSections();
  $('#search_page').show();
}

function toggleArtist() {
  hideUnusedSections();
  getArtist();
}

function getArtist() {
  const artist_name = $("input[name=artistSearch]");
  const art = artist_name.val();
  var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "jsonp",
    "url": ARTIST_URL + art,
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache",
    }
  };
  $.ajax(settings).done(function (response) {
    showArtist(response);
  });
}

function showArtist(results) {
  $("#artistSearch").val('');
  $("#artist_results_page").show();
  let id = results.performers.performer[0].url;
  $(`#id`).text(id);
  let name = results.performers.performer[0].name;
  $(`#name`).text(name);
}

function toggleEvents() {
  hideUnusedSections();
  $("#event_results_page").show();
  getEvents();
}

function getEvents() {
  var locate = $("input[name=eventSearch]");
  var loc = locate.val();
  var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "jsonp",
    "url": EVENT_URL + loc,
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache"
    }
  };
  $.ajax(settings).done(function (response) {
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
  var description = results.events.event[0].description;
  $(`#description`).text(description);

 $("#eventSearch").val('');
  var title = results.events.event[1].title;
  $(`#title2`).text(title);
  var city = results.events.event[1].city_name;
  $(`#city_name2`).text(city);
  var start_time = results.events.event[1].start_time;
  $(`#starts2`).text(start_time);
  var venueE = results.events.event[1].venue_name;
  $(`#venueE2`).text(venueE);
  var address = results.events.event[1].venue_address;
  $(`#address2`).text(address);
  var description = results.events.event[1].description;
  $(`#description2`).text(description);

  $("#eventSearch").val('');
  var title = results.events.event[2].title;
  $(`#title3`).text(title);
  var city = results.events.event[2].city_name;
  $(`#city_name3`).text(city);
  var start_time = results.events.event[2].start_time;
  $(`#starts3`).text(start_time);
  var venueE = results.events.event[2].venue_name;
  $(`#venueE3`).text(venueE);
  var address = results.events.event[2].venue_address;
  $(`#address3`).text(address);
  var description = results.events.event[2].description;
  $(`#description3auth`).text(description);
}



function handleNewUser() {
  hideUnusedSections();
  const uN = $("input[name=username]").val();
  const pW = $("input[name=password]").val();
  const eM = $("input[name=email]").val();
  postNewUser(uN, pW, eM);
}

function postNewUser(uN, pW, eM) {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": './server.js',
    "method": "POST",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    "processData": false,
    "data": {
      "username": uN,
      "password": pW,
      "email": eM
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    displayProfile();
  });
}
/* $.ajax({
    async: true,
    crossDomain: true,
    url: USER_URL,
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: {
      "username": uN,
      "password": pW,
      "email": eM
    },
    
    success: function() {
      displayProfile();
    },
     error: function() {
       alert('Error!');
     }
  });
}
*/

/*
 var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": USER_URL,
    "method": "POST",
    "headers": {
      "Cache-Control": "no-cache",
      "Postman-Token": "2150d766-dacf-479c-9a1a-036d07309f72"
    }
  };

  $.ajax(settings).done(function (response) {
    storeUser(response);
  });
}
*/
function displayProfile() {
  hideUnusedSections();
  $('profile_page').show();
  storeUser(response);
}

function storeUser(response) {
  /* var User = {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email
    }
  */
  var User = {
    id: this.User[user.id],
    username: this.User[user.username],
    password: this.password[user.password],
    email: this.User[user.email]
  };
  clearValues();
}


function clearValues() {
  $('#enterUser').val('');
  $('#enterPass').val('');
  $('#enterEmail').val('');
  handleHello();
}

function handleHello() {
  $('#profile_page').show();
  var hello = '<header>Hello,  ${username} ! </header>';
}

function toggleSignIn() {
  hideUnusedSections();
  $("#sign_in_page").show();
}


function handleOldUser() {
  $("#sign_in_page").hide();
  $('#profile_page').show();
  var usnm = $("input[name=un]").val();
  var pasw = $("input[name=pw]").val();
  getOldUser(usnm, pasw);
}

function getOldUser(usrm, pasw) {
  /* var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8080/user",
  "method": "POST",
  "headers": {
     "Content-Type": "application/x-www-form-urlencoded",
    //"Content-Type": "application/json",
    //"Cache-Control": "no-cache"
  },
  "processData": false,
  "data": {
      "username": uN,
      "password": pW,
      "email": eM
    }
    };
$.ajax(settings).done(function (response) {
  console.log(response);
  displayProfile();
});
*/

  $.ajax({
    method: "GET",
    url: USER_URL,
    dataType: "json",
    contentType: "application/json",
    query: {
      "username": usnm,
      "password": pasw
    },
    success: function () {
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email
      },
      storeOldUser();
    },
    error: function () {
      alert('Error!');
    }
  });
}

function storeOldUser() {
  var User = {
    id: this.User[user.id],
    username: this.User[user.username],
    password: this.password[user.password],
    email: this.User[user.email]
  };
  console.log(User);
  clearOldValues();
}

function clearOldValues() {
  $('#userName').val('');
  $('#userPass').val('');
}

function updateUser() {
  let userId = this.User[user.id];
  let usern = $("input[name=updateUN]").val();
  let passw = $("input[name=updatePASS]").val();
  handleUpdate(userId, usern, passw);
}

function handleUpdate(userId, usern, passw) {

  $.ajax({
    method: "PUT",
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
  console.log('deleting user');
  var UserId = this.User[user.id];

  $.ajax({
    method: "DELETE",
    url: USER_URL + "/" + UserId,
    dataType: "jsonp",
    contentType: "application/json",

    success: function () {
      alert('Success!');
    },

    error: function () {
      alert('Error!');
    }
  });
}


$(document).ready();

window.onload = function () {
  hideUnusedSections();
  renderPage();
};