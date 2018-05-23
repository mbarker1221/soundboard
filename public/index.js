/*jshint esversion: 6 */
/*jshint node: true */
var serverBase="http://localhost:8080/user";
var DATABASE_URL = "mbarker1221:shompin1@ds131698.mlab.com:31698/users";
var USER_URL = "./server";
var EVENT_URL="http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
var ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";

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
  };
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
     success: function() {
       displayProfile();
    },
    complete: function() {
      displayProfile();
    } 
});
}

function displayProfile(uN, pW, eM) {
  hideUnusedSections();
  $('#profile_page').show();
}

function toggleOldUser() {
  var username = $("input[name=un]").val();
  var password = $("input[name=pw]").val();
  getOldUser(username, password);
}

function getOldUser(username, password) {
  $.ajax({
    type: 'GET',
    url: serverBase,
    crossDomain: true,
    data: {
      "username": username,
      "password": password
    },
    dataType: 'json',
    success: function() {
      displayProfile();
    },

    complete: function() {
     displayProfile();
    }
    });
}
  
function updateUser() {
  var newUsername = $("input[name=updateUN]").val();
  var newPassword = $("input[name=updatePASS]").val();
  sendUpdatedUser(newUsername, newPassword);
}

function sendUpdatedUser(newUsername, newPassword) {
   
  $.ajax({
    type: "PUT",
    url: serverBase + '/' + id,
    dataType: "json",
    contentType: "application/json",
    data: {
      "username": newUsername,
      "password": newPassword
    },
    success: function(data, textStatus, xhr) {
      console.log(response);
      alert('success');
    },
    error: function () {
      alert('Error!');
    }
  });
}

function deleteUser() {
  $.ajax({
    type: "DELETE",
    url: serverBase + "/" + id,
    dataType: "json",
    contentType: "application/json",

    success: function () {
      hideUnusedSections();
      $('.deletePage').show();
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





