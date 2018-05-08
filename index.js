/*jshint esversion: 6 */
/*jshint node: true */
var $ = require('jquery');
var serverBase = "http://localhost:8080/";
var USER_URL = "./server";
var EVENT_URL="http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
//const ARTIST_URL= "/artistRouter";
//const EVENT_URL = "./eventsRouter";
var ARTIST_LIST_URL = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=";
var ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
var ALL_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music";
var searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";
var events = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=P0-001-000034547-0";
var similar = "http://api.eventful.com/json/performers/get?c7nd5jGWK8tkcThz&id=P0-001-000000045-2";
// "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";

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
    "dataType": "jsonp",
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
    "dataType": "jsonp",
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
hideUnusedSections();
$(".profile_page").show();
  handleNewUser();
}


function handleNewUser() {
  var uN = $("input[name=username]").val();
  var pW = $("input[name=password]").val();
  var eM = $("input[name=email]").val();
  postNewUser(uN, pW, eM);
}

function postNewUser(uN, pW, eM) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": USER_URL,
    //USER_URL + "/",
    //"http://mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users",
  
    "type": "POST",
    "dataType": "jsonp",
    "headers": {
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
    //console.log(response);
    displayProfile(response);
  });
}

function displayProfile(response) {
hideUnusedSections();
  handleHello();
}

function handleHello() {
  hideUnusedSections();
  $('#profile_page').show();
 var hello = ( `Hello, ${this.username} !`);
}

function toggleOldUser() {
hideUnusedSections();
  $(".profile_page").show();
  handleOldUser();
}

function handleOldUser() {
  var usnm = $("input[name=un]").val();
  var pasw = $("input[name=pw]").val();
  clearValues();
}

function clearValues() {
  $("#userName").val('');
  $("#userPass").val('');
  getOldUser(usnm, pasw);
}

function getOldUser(usnm, pasw) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:8080/user",
    "type": "GET",
    "dataType": "jsonp",
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
  $.ajax(settings).done(function (response) {
   //console.log(response);
    displayProfile(response);
  });
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
    dataType: "jsonp",
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

$(() => {
  hideUnusedSections();
  renderPage();
});






var userTemplate = (
  '<div class="user js-user">' +
    '<h3 class="js-user-username"><h3>' +
    '<hr>' +
    '<ul class="js-user-email">' +
    '</ul>' +
    '</div>' +
  '</div>'
);


var USER_URL = '/user';



function getAndDisplayUsers() {

  $.getJSON(USER_URL, function(users) {
    console.log('Rendering users');
    var usersElement = users.map(function(user) {
      var element = $(userTemplate);
      element.attr('id', user.id);
      element.find('.js-user-username').text(user.username);
      user.identifiers.forEach(function(identifier) {
        element.find('.js-user-identifiers').append(
          '<li>' + identifier + '</li>');
      });
      return element;
    });
    $('.js-users').html(usersElement)
  });
}

function addUser(user) {

  $.ajax({
    type: 'POST',
    url: USER_URL,
    data: JSON.stringify(user),
    success: function(data) {
      getAndDisplayUsers();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function deleteUser(userId) {
  console.log('Deleting user`' + userId + '`');
  $.ajax({
    url: USER_URL + '/' + userId,
    method: 'DELETE',
    success: getAndDisplayUsers
  });
}

 updateUser(user) {
  console.log('Updating user `' + user.id + '`');
  $.ajax({
    url: USER_URL + '/' + user.id,
    type: 'PUT',
    data: user,
    success: function(data) {
      getAndDisplayUsers();
    }
  });
}

function handleUserAdd() {
  $('#js-user-form').submit(function(e) {
    e.preventDefault();
    var identifiers = $(
      e.currentTarget).find(
      '#identifiers-list').val().split(',').map(
        function(identifier) { return identifier.trim() });
    addUser({
      name: $(e.currentTarget).find('#user-name').val(),
      ingredients: ingredients
    });
  });
}


function handleUserDelete() {
  $('.js-users').on('click', '.js-user-delete', function(e) {
    e.preventDefault();
    deleteUser(
      $(e.currentTarget).closest('.js-user').attr('id'));
  });
}
}


$(function() {
  getAndDisplayUsers();
  handleUserAdd();
  handleUserDelete();
});


