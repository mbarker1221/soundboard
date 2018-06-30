

/*jshint esversion: 6 */
/*jshint node: true */
/*global jQuery, Handlebars, Router */

//jQuery(function ($) {
var serverBase = "http://localhost:8080/user";
//var serversBases = "http://localhost:8080/user/";
var DATABASE_URL = "mbarker1221:shompin1@ds131698.mlab.com:31698/users";

var EVENT_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
var ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";


  const api = {
    init: function (serverBase) {
      this.serverBase = serverBase;
      //this.serverBases=serverBases;
    },
    create: function (obj) {
      return fetch(this.serverBase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
         body: obj ? JSON.stringify(obj) : null
      }).then(res => res.json());
  // }).then(user => res.json(user.serialize())
    },
    read: function () {
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
      }).then(res => res.text());
    }
  };



  /*generateUser(data) {
      return `
        <li class="${user.username}" user-id="${user.id}">
          <div class="view">
            <input class="toggle" type="checkbox" ${user.username}>
            <label>${user.email}</label>
            <button class="edit"></button>
          </div>
          <input class="edit" value="${user.email}">
        </li>`;
    },
    
      getIdFromEl: function (el) {
      return $(el).closest('li').user('id');
    },
*/
 // jQuery(function ($) {
function clearFormValues() {
  $("#artistSearch").val('');
  $("#eventSearch").val('');
  $("#userName").val('');
  $("#userPass").val('');
  $("#enterUser").val('');
  $("#enterEmail").val('');
  $("#enterPass").val('');
  $("#newU").val('');
  $("#newPass").val('');
}

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
  clearFormValues();
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
  clearFormValues();
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
  clearFormValues();
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
function getIdFromUser(user, _id) {
const id = this.User.id;
}

 function getUserById(id) {
  return this._users.find(user=> user.id === id);
}

function deleteUserById(id) {
  this._users = this._users.filter(user => user.id !== id);
}
    
function updateUserById(id, update) {
  let user = this.getUserById(id);
  if (user) {
    Object.assign(user, update);
  }
  return user;
}

function toggleNewUser() {
  var uN = $("input[name=username]").val();
  var pW = $("input[name=password]").val();
  var eM = $("input[name=email]").val();
  handleNewUser(uN, pW, eM);
}

function handleNewUser(uN, pW, eM) {
  var user = {
    "username": uN,
    "password": pW,
    "email": eM 
  };
 // var uNe = uN.val();
 //var eMl = eM.val();
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
return {
      id: this._id,
      username: this.username,
      password: this.password,
      email: this.email
    };
     },
    complete: function () {
    
     clearFormValues();
      displayProfile();
    } 
});
}

  function displayProfile() {   
  hideUnusedSections();
  $('#profile_page').show();
}
 // $(`#uNe`).text(uNe);
  //  $(`#eMl`).text(eMl);

  
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
     
    return {
      id: this._id,
      username: this.username,
      password: this.password,
      email: this.email
  };

      },

    complete: function () {
     //var displayname = $("input[name=un]").val();
     // var displaypassword = $("input[name=pw]").val();
      // console.log(ObjectId.toString());
     // getIdFromUser();
   clearFormValues();
     displayProfile();
    }
    });
}
  
  function showProPage() {   
    hideUnusedSections();
    $('#editPage').show();
  }

  function locateMyProfile() {
    var Username = $("input[name=you]").val();
    var Password = $("input[name=youPass]").val();
    retrieveUser(Username, Password);
  }

  function retrieveUser(Username, Password) {
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
   //    var objectId = db.user.findOne({}, {_id: 1})._id;
      //User => {res.status(201).json(User.serialize())};
      clearFormValues();
       hideUnusedSections();
      $('#updatePage').show();
              }
              });
              }
    
  function upU() {

 var newUsername = $("input[name=newU]").val();
 var newPassword = $("input[name=newPass]").val();


 upUser(newUsername, newPassword);
}

  function upUser(newUsername, newPassword) {
  $.ajax({
    type: 'PUT',
    url: serverBase + '/' + id,
    crossDomain: true,
    data: {
      "username": newUsername,
      "password": newPassword
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
      clearFormValues();
      renderPage();
    }
    });
}

  function delProfile() {
  $.ajax({
    type: "DELETE",
    url: serverBase + '/' + id,
    dataType: "json",
    contentType: "application/json",

    success: function () {
      dUserById(id);
      hideUnusedSections();
      $('.deletePage').show();
    },

   complete: function () {
    clearFormValues();
      alert("Success!");
   }
   });
 }
    /*  
     function dUserById(id) {
     this._users = this._users(user => user.id !== id);
    }
    
function dById(event) {
      const id = this.id;
      api.delete(id)
        .then(() => {

          deleteUserById(id);
          this.render();
        })
        .catch((err) => {
          console.error(err);
        });
    }
*/
$(window).on("load", function() { 
hideUnusedSections();
clearFormValues();
  $("#landing_page").show();
   $("body").removeClass("preload");
});
//});