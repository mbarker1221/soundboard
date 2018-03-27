const serverBase = "http://localhost:8080:";
const USER_URL =serverBase + "./server.js";
const EVENT_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&l=";
const ARTIST_Events_URL = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=";
const ARTIST_URL="http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
const ALL_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music";
const searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";
const events ="http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=P0-001-000034547-0";
const similar = "http://api.eventful.com/json/performers/get?c7nd5jGWK8tkcThz&id=P0-001-000000045-2";

function hideUnusedSections() {
  document.getElementById("event_results_page").style.display = "none";
  document.getElementById("artist_results_page").style.display = "none";
  document.getElementById("sign_up_page").style.display = "none";
  document.getElementById("sign_in_page").style.display = "none";
  document.getElementById("update_user_page").style.display = "none";
  document.getElementById("delete_profile_page").style.display = "none";
  document.getElementById("profile_page").style.display = "none";
   $("#artist_results_page").hide();
}

function toggleArtist() {
 
//document.getElementById("artist_results_page").style.display = "block";
//  document.getElementById("event_results_page").style.display = "none";
   $("#event_results_page").hide();
  $("#artist_results_page").show();
  getArtist();
}

function getArtist(data) {
    const artist_name = $("input[name=artistSearch]");
    const art = artist_name.val();
  $.getJSON(ARTIST_URL + art, function(data) {
    showArtist(data);
  })
}

function showArtist(results) {
  $("#artistSearch").val('');
  console.log(results);
  
  let id = results.performers.performer[0].id;
  $(`#id`).text(id);
  let name = results.performers.performer[0].name;
  $(`#name`).text(name);
}

function toggleEvents() {
 
 // document.getElementById("event_results_page").style.display = "block";
  //document.getElementById("artist_results_page").style.display = "none";
  $("#artist_results_page").hide();
  $("#event_results_page").show();
  getEvents();
}
function getEvents(data) {
   const locate = $("input[name=eventSearch]");
  const loc = locate.val();

  //let params = {
   // location: loc
  
  $.getJSON(EVENT_URL + locate, function(data) {
   showEvents(data);
  });
}

function showEvents(results) {
  $("#eventSearch").val('');
  
  let title = results.events.event[0].title;
  $(`#title`).text(title);
  let city = results.events.event[0].city_name;
  $(`#city_name`).text(city)
  let start_time = results.events.event[0].start_time;
  $(`#starts`).text(start_time)
  let venueE = results.events.event[0].venue_name;
  $(`#venueE`).text(venueE);
  let address = results.events.event[0].venue_address;
  $(`#address`).text(address)
  let description = results.events.event[0].description;
  $(`#description`).text(description);
}

function toggleSignUp() {
  document.getElementById("sign_up_page").style.display = "block";
  document.getElementById("sign_in_page").style.display = "none";
  $("#sign_up_page").show();

}

function handleNewUser() {
  let uN = $("input[name=username]");
  let pW = $("input[name=password]");
  let eM = $("input[name=email]");
  postNewUser();
}

function postNewUser() {
  $.ajax({
    method: "POST",
    url: "USER_URL",
    data: {
      "username": "uN",
      "password": "pW",
      "email": "eM"
    },

    dataType: "json",
    contentType: "application/json",
    success: function() {
      handleHello();
    }
  });
}

function handleHello() {
  document.getElementById("sign_up_page").style.display = "none";
   document.getElementById("profile_page").style.display = "block";
   var hello = '<header>Hello,  ${username} ! </header>';
};

function toggleSignIn() {
  document.getElementById("sign_in_page").style.display = "block";
  document.getElementById("sign_up_page").style.display = "none";
}

function handleOldUser() {
  document.getElementById("update_user_page").style.display = "block";
  document.getElementById("delete_profile_page").style.display = "block";
  retrieveUser();
  //upd.style.display = "block";
}

function retrieveUser() {
  let username = $("input[name=un]");
  let password = $("input[name=pw");

  $.ajax({
    method: "GET",
    url: 'USER_URL',
    dataType: "json",
    contentType: "application/json",
    query: {
      "username": username,
      "password": password
    },
    success: function(user) {
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email
      }
    }
  });
  storeUser();
}

function storeUser() {
  let storedUser = {
   id : this.id,
  username : this.username,
  password : this.password,
  email : this.email
  }
  console.log(storedUser);
}

function updateUser() {
  let userId = this.userId;
 let usern = $("input[name=updateUN");
 let passw = $("input[name=updatePASS");
 
  $.ajax({
    method: "PUT",
    url: "USER_URL" + "/" + userId,
    dataType: "json",
    contentType: "application/json",
    data: {
      "username": usern,
      "password": passw
    },
    success: function(user) {
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email
      }
    },
  });
  storeUser()
}

function deleteUser() {
  document.getElementById("delete_profile").style.display = "block";
  console.log('deleting user');
  const userId = this.userId;

  $.ajax({
    method: "DELETE",
    url: "USER_URL" + "/" + userId,
    dataType: "json",
    contentType: "application/json",


    success: function() {
      alert('Success!');
    },

    error: function() {
      alert('Error!')
    }
  });
}

hideUnusedSections()
