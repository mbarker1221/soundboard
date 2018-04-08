const serverBase = '//localhost:8080:';
const USER_URL = "./server.js";
const EVENT_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music&location={locate}&date=future";
const ARTIST_URL = "http://api.songkick.com/api/3.0/search/artists.json?apikey=ovLum2i3CCGRjtHA&query={artist_name}";
   
function handleNavigation() {
   $("button").click(functi
      event.preventDefault();
     
  });
};


function getArtist() {
    let artist_name = $('input[name=artistSearch]');
       $.ajax({
        type: 'GET',
        url: ARTIST_URL,
        dataType: 'json',
        contentType: 'application/json',
        query: artist_name,

        success: function(event) {
           showArtist()
          }
          });

    //display artist results page 
  function showArtist(results) {
     $("#artistSearch").val('');
      document.getElementById("artist_results_page").style.display = "block";
    let artist = results.artist[index].displayName;
    $(`#name`).text(artist);
  }
      //retrieve data from client side 
  function getEvents() {
    let locate = $('input[name=eventSearch]');
       $.ajax({
        type: 'GET',
        url: EVENT_URL,
        dataType: 'json',
        contentType: 'application/json',
        query: 'locate',
        success: function(event) {
          showEvents()
        }
      })
     }
     
    function showEvents(results) {
     $("#eventSearch").val('');
    document.getElementById("event_results_page").style.display="block";
   
    let event = events.event[index].displayName;
    $(`#art`).text(event);
    let event_title = events.event[index].title;
    $(`#title`).text(event_title); 
    let city_name = events.event[index].city_name;
    $(`#city`).text(city_name);
    let start_time = events.event[index].start_time; 
    $(`#starts`).text(start_time);
  let description =  events.event[index].description;
  $(`#description`).text(description);
  let venue = events.event[index].venue_name;
  $(`#venueE`).text(venue_name);
  let venue_address = events.event[index].venue_address;
  $(`#address`).text(venue_address);
  let artist_name = events.event[index].artist_name;
  $(`#artist`).text(artist_name);
}

 function toggleSignUp() {
 document.getElementById("sign_up").style.display = "block";
 handleNewUser()
}

function handleNewUser() {
    let uN = $('input[name=username]');
    let pW = $('input[name=password]');
    let eM = $('input[name=email]');
    postNewUser();
  }

    function postNewUser() {
       $.ajax({
        method: 'POST',
        url:'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users', 
        data: {
           username: uN,
           password: pW,
           email: eM
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
          return user;
        }
      });
  };
  
function handleHello() {
   var hello = '<header>Hello,  ${username} ! </header>';    
  }
 
function toggleSignIn() {
  if (registin.style.display=== "none") {
    registin.style.display = "block";
  } else {
    registin.style.display = "none";
  }
    handleOldUser()
  }

function handleOldUser() {
  upd.style.display = "block";
  retrieveUser()
}

function retrieveUser() {
 let username = $('input[name=userName]').val();
 let password = $('input[name=userPass').val();

      $.ajax({
          method: "GET",
          url: USER_URL, 
          dataType: 'json',
          contentType: 'application/json',
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
      storeUser()
      };
    
     function updateUser() {
      const userId = user.id($.currentTarget);
      const usern = $('input[name=updateUN').val();
      const passw = $('input[name=updatePASS').val();
        $.ajax({
          method: "PUT",
          url: USER_URL + '/' + userId,
          dataType: 'json',
          contentType: 'application/json',
          data: {
            'username': usern,
            'password': passw
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
      console.log('deleting user');
      const userId = user.id($.currentTarget);

        $.ajax({
          method: "DELETE",
            url: USER_URL + '/' + userId,
          dataType: 'json',
          contentType: 'application/json',
      

            success: function() {
              alert('Success!');
            },

            error: function() {
              alert('Error!')
            }
        });
      }
  
handleNavigation();