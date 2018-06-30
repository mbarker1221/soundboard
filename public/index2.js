
'use strict';
/*jshint esversion: 6 */
/*jshint node: true */
/*global jQuery, Handlebars, Router */
//jQuery(function ($) {

var serverBase="http://localhost:8080/user";
var serversBases="http://localhost:8080/user/";
var DATABASE_URL = "mbarker1221:shompin1@ds131698.mlab.com:31698/users";
var USER_URL = "./server";
var EVENT_URL="http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
var ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
/*
   const store = {
    setUser(data) {
      this.user = data;
    },
      setFilter(filter) {
      this.filter = (filter) ? filter : 'all';
    },
    insert(identifier) {
      this.user.push(indentifier);
    },
  
    getUserById(id) {
      return this._user.find(user => user.id === id);
    },
    deleteUserById(id) {
      this._user = this._user.filter(user => user.id !== id);
    },
    updateUserById(id, update) {
      let user = this.getUserById(id);
      if (user) {
        Object.assign(user, update);
      }
      return user;
    },

      getIdFromUser(user, _id) { 
    const id = this.user._id;
    },
    getAllUsers: function () {
      return this.user;
    },
    };
*/
       const api = {
    init: function (serverBase) {
      this.serverBase = serverBase;
    },
    create: function (obj) {
      return fetch(this.serverBase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: obj ? JSON.stringify(obj) : null
      }).then(res => res.json())
      .then(displayProfile());
    },
    get: function () {
      return fetch(this.serverBase, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then(res => res.json());
    },
    update: function (id, obj) {
       return fetch(`${this.serverBase}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: obj ? JSON.stringify(obj) : null
      }).then(res => res.json());
    },
    delete: function (id) {
      return fetch(`${this.serverBase}/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      }).then(res => res.json());
    }
  };

/*
  const app = {
    init: function () {
      const hash = location.hash.split('/')[1];
      store.setFilter(hash);
      api.get()
        .then((data) => {
          store.setUsers(data);
          this.bindEvents();
        })
        .catch((err) => {
          console.error(err);
        });
    },
bindEvents: function () {
     // $(window).on('hashchange', this.updateFilter.bind(this));
      $('#createNewUser').on('click', this.toggleNewUser.bind(this));
      $('#submitUser').on('click', this.toggleOldUser.bind(this));
      $('#restart').on('click', this.renderPage.bind(this));
      $('#btnFindArtist').on('click', this.toggleArtist.bind(this));
      $('#btnGetEvents').on('click', this.getEvents.bind(this));
      $('#sign_up_button').on('click', this.toggleSignUp.bind(this));
      $('#sign_in_button').on('click', this.toggleSignIn.bind(this));
      $('#updateU').on('click', this.updateUser.bind(this));
       $('#editMyProfile').on('click', this.editMyProfile.bind(this));
        $('#getMyProfile').on('click', this.getMyProfile.bind(this));
         $('#updateMyProfile').on('click', this.updateMyProfile.bind(this));
      $('#submitFav').on('click', this.getNotifications.bind(this));
      $('#dele').on('click', this.deleteUser.bind(this));
      $('#resync').on('click', this.renderPage.bind(this));
      $('#rerun').on('click', this.renderPage.bind(this));
      $('#replay').on('click', this.renderPage.bind(this));
      $('#redo').on('click', this.renderPage.bind(this));
    },
/*updateFilter: function () {
      store.filter = location.hash.split('/')[1];
       this.render();
    },
    render: function () {
      const users = store.getUsers();
      const usersFragments = users.map((identifier) => this.generateUser(identifier));
      $('#user-list').html(usersFragments.join(''));
      $('#main').toggle(users.length > 0);
      $('#new-user').focus();
    },
   
     generateUser: function (identifier) {
      return `
          <div class="view">
           
            <li>${user.username}</li>
            <li>${user.password}</li>
            <li>${user.email}</li>
            <li>${user.id}</li>
            
          </div>         
        `;
    },

      getIdFromEl: function (el) {
      return $(el).closest('li').data('id');
    },
    createUser (e) {
      const input = $(e.target);
      const user = input.val().trim();
     }

      /* api.update(id, updatedUser)
        .then(res => {
          store.updateUserById(res.id, res);
        })
        .catch((err) => {
          console.error(err);
        };
    
   
   updateUser: function (event) {
      const el = $(event.target);
      const val = el.val().trim();
      const id = this.getIdFromEl(event.target);
      const user = store.getUserById(id);
    },
    
      updateUser: function () {
      const id = this.getIdFromUser();
      const user = store.getUserById(id);
    },

      api.update(id, user)
        .then(res => {
          store.updateUserById(res.id, res);
    
        .catch((err) => {
          console.error(err);
        });
    
    deleteUser: function (event) {
      const id = this.getIdFromUser();
      api.delete(id)
        .then(() => {
          store.deleteUserById(id);
        })
        .catch((err) => {
          console.error(err);
        });
    },
*/

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
  
 function toggleArtist() {
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
  
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&location=atlanta",
  "method": "GET",
  "headers": {
    "keywords": "music",
    "date": "future",
    "app_key": "c7nd5jGWK8tkcThz",
    "Authorization": "Basic bWJhcmtlcjEyMjFAZ21haWwuY29tOnNob21waW4x",
    "Cache-Control": "no-cache",
    "Postman-Token": "be3152b1-8cd8-4f18-92c6-309092b4b4e5"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
}
/*

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
*/
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
    store.getIdFromUser();
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
      const id = store.getIdFromUser();
      const user = store.getUserById(id);
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
  
  
    function deleteUser() {
 var username = $("input[name=you]").val();
 var password = $("input[name=youPass]").val(); 
 getProfile(username, password);
}

  function getProfile(username, password) {
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
      const id = store.getIdFromUser();
      store.deleteUserById(id);
    },
    complete: function () {
     deleteById(id);
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
      store.deleteUserById(id);
      hideUnusedSections();
      $('.deletePage').show();
      
    },

   complete: function () {
      alert("Success!");
   }
   });
         }
  
  

/*let params = new URLSearchParams(location.search.slice(1));
  let baseUrl = `${window.location.origin}/user/`;
api.init(baseUrl);
  app.init();
    */
$(window).on("load", function() { 

  renderPage();
   $("body").removeClass("preload");
});
  