
'use strict';
/*jshint esversion: 6 */
/*jshint node: true */
/*global jQuery, Handlebars, Router */

//jQuery(function ($) {
var serverBase = "http://localhost:8080/user";
var serversBases = "http://localhost:8080/user/";
var DATABASE_URL = "mbarker1221:shompin1@ds131698.mlab.com:31698/users";

var EVENT_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
var ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";


  const api = {
    init: function (baseUrl) {
      this.baseUrl = baseUrl;
    },
    create: function (obj) {
      return fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: obj ? JSON.stringify(obj) : null
      }).then(res => res.json());
    },
    read: function () {
      return fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then(res => res.json());
    },
    update: function (id, obj) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: obj ? JSON.stringify(obj) : null
      }).then(res => res.json());
    },
    delete: function (id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      }).then(res => res.text());
    }
  };



  function hideUnusedSections() {
  $("#landing_page").hide();
  $("#artist_results_page").hide();
  $("#event_results_page").hide();
  $("#sign_up_page").hide();
  $("#sign_in_page").hide();
  $("#profile_page").hide();
  $("#editPage").hide();
  $("#updatePage").hide();
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
      'Content-Type': 'application/json',
          'Accept': 'application/json'
    }
  };
  
  $.ajax(settings).done(function(response) {
    showArtist(response);
  });
}

  function showArtist(response) {
    hideUnusedSections();
  $("#artist_results_page").show();
  $("#artistSearch").val('');
  var id = results.performers.performer[0].url;
  $("#id").text(id);
  var name = results.performers.performer[0].name;
  $("#name").text(name);
}

function getEvents() {
  var locate = $("input[name=eventSearch]");
  var loc = locate.val();
 /*

  getDataFromApi();
}

function getDataFromApi(searchTerm, callback) {
   var locate = $("input[name=eventSearch]");
  var loc = locate.val();
    const URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=" + loc;
    $.getJSON(URL, function(data) {
      displaySearchData(data);
    });
  }
  function displaySearchData(results) {
*/
  
var settings = {
  "async": true,
  "crossDomain": false,
  "url": "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&location=atlanta",
  "method": "GET",
  "headers": {
    "app_key": "c7nd5jGWK8tkcThz",
    "Authorization": "Basic bWJhcmtlcjEyMjFAZ21haWwuY29tOnNob21waW4x",
    "Cache-Control": "no-cache",
   
  }
};

$.ajax(settings).done(function (response) {
    $("#eventSearch").val('');
  showEvents(response);
});
}

function showEvents(response) {
  hideUnusedSections();
  $(".event_results_page").show();
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
/*
function getUserById(id) {
      return this.user.find(user => user.id === id);
    }
   function deleteUserById(id) {
      this.user = this.user.filter(user => user.id !== id);
    },
   function updateUserById(id, update) {
      let user = this.getUserById(id);
      if (user) {
        Object.assign(user, update);
      }
      return user;
    },

function watchSubmit() {
  $('.locationS').submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.inputL');
    let query=queryTarget.val();
    getDataFromApi(query, displaySearchData);
  });
}
$(watchSubmit);
*/
    function toggleNewUser() {
  var uN = $("input[name=username]").val();
  var pW = $("input[name=password]").val();
  var eM = $("input[name=email]").val();
  handleNewUser(uN, pW, eM);
}

  function handleNewUser(uN, pW, eM) {
  var User = {
    "username": uN,
    "password": pW,
    "email": eM 
  };
  postUser(uN, pW, eM);
}

  function postUser(uN, pW, eM) {
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
     success: function () {
       displayProfile();
    },
    complete: function () {
       var displayName = $("input[name=username]").val();
  var displayPass = $("input[name=password]").val();
  var displayEmail = $("input[name=email]").val();
      $("#enterUser").val('');
      $("#enterEmail").val('');
       $("#enterPass").val('');
      displayProfile();
    } 
});
}

  function displayProfile() {   
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
      success: function () {
     // user => res.json(user.serialize();
      displayProfile();
    },

    complete: function () {
     var displayname = $("input[name=un]").val();
      var displaypassword = $("input[name=pw]").val();
      $("#userName").val('');
        $("#userPass").val('');
     displayProfile();
    }
    });
}
  
  function editMyProfile() {   
    hideUnusedSections();
    $('#editPage').show();
  }

  function getMyProfile() {
    var Username = $("input[name=you]").val();
    var Password = $("input[name=youPass]").val();
    getUser(Username, Password);
  }

  function getUser(Username, Password) {
    $.ajax({
      type: 'GET',
      url: serverBase,
      crossDomain: true,
      data: {
        "username": Username,
        "password": Password
    },
    dataType: 'json',
    success: function () { 
      return {
      id: this._id,
      username: this.username,
      password: this.password,
      email: this.email
   };
    },
    complete: function () {
       hideUnusedSections();
      $('#updatePage').show();
    }
    });
}

  function updateMyProfile() {
 var newUsername = $("input[name=newYou]").val();
 var newPassword = $("input[name=newPass]").val();
// var id = this.user._id;
 updateUser(newUsername, newPassword, id);
}

  function updateUser(newUsername, newPassword, id) {
  $.ajax({
    type: 'PUT',
    url: serverBases + id,
    crossDomain: true,
    data: {
      "username": newUsername,
      "password": newPassword
    },
    dataType: 'json',
    success: function () {
    console.log("success!");
    },

    complete: function () {
      hideUnusedSections();
      renderPage();
    }
    });
}

  function deleteById(id) {
  $.ajax({
    type: "DELETE",
    url: serverBases + id,
    dataType: "json",
    contentType: "application/json",

    success: function () {
   
      hideUnusedSections();
      $('.deletePage').show();
      
    },

   complete: function () {
      alert("Success!");
   }
   });
 }

$(window).on("load", function() { 
hideUnusedSections();
  $("#landing_page").show();
   $("body").removeClass("preload");
});
//});