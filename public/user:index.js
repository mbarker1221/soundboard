const serverBase = '//localhost:8080:';
const USER_URL = "./server.js";
const EVENT_URL = serverBase + "./eventsRouter.js";
const ARTIST_URL = serverBase + "./eventsRouter.js"

function handleNavigation() {
    $('nav a').click(function(event) {
        event.preventDefault();
        const currentPage = $(this).data('page');
    $('.page').hide();
    $(`.${currentPage}`).show();
  });
  }

    function openNav() {
        document.getElementById("nav_start").style.width = "15%";
        document.getElementById("main").style.marginLeft = "15%";
    }
    // Clear form values

    function setEventListeners() {
        handleNavigation();
    }

    //show start page
    function showSignUpPage() {
        $(".signUpPage").show();
        $(".page").hide();
  
    }

    function toggleRegistration() {
      $('#signInLink').show();
      $('.link').click(function(event) {
        event.preventDefault();
        $('#signInLink').hide();
        $('#signInPage').show();
        ${'#signUpPage'}.hide();
      })
    };

    const userTemplate = (
  '<div class="user_js">' +
    '<h3 class="user_name"><h3>' +
    '<hr>' +
    '<ul class="user_info">' +
    '</ul>' +
    '</div>' +
  '</div>'
);

     
function handleNewUser() {
 
    const usernew = $('input[name=username]');

   

      const passnew = $('input[name=password]');
       
    
 
     const emailnew = $('input[name=email]');
     storeUser();
     }
  }
}
  function storeUser() {
    const user = {
      username: usernew,
      password: passnew,
      email: emailnew
      };
      return user;
      postNewUser();
     };
   
    function postNewUser() {
       $.ajax({
        method: 'POST',
        url: 'https://mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users';
        req.params.body = {
           username: usernew,
           password: passnew,
           email: emailnew
        }
        dataType: 'json',
        contentType: 'application/json'
        success: return user;
        renderSearchPage();
      }),
  };

function handleOldUser() {

    function renderSignInPage() {
      const userN=('input[name=un');
      if (userN.length < 5) {
      alert('must be more than 4 characters');
      }
       if (userN.length > 15) {
        alert('must be less than 16 characters')
       }
       if (userN.length > 4 && < 16){
      const userName= userN
    };

      const passW=('imput[name=pw');
       if (passW.length < 5) {
        alert('must be more than 4 characters');
       }
       if (passW.length > 15) {
        alert('must be less than 16 characters')
       }
       if (passW.length > 4 && < 16) {
        const passWord= passW
       } 
        authUser()
    };

      function authUser() {
         $.ajax({
        method: 'POST',
        url: USER_URL,
        req.params.body = {
           username: userName,
           password: passWord,
        }
        dataType: 'json',
        contentType: 'application/json'
        success: return user;
        renderSearchPage();  
        })
      };

        
    function renderSearchPage() {
     
      }
    }

  function getArtist() {
    const artistIn = $('input[name=artistSearch]');
        $.getJSON(ARTIST_URL, artistIn, function(data) {
          showArtist(data); 
        })
      }
    
    //display artist results page 
  function showArtist(results) {
    let art = `
      <a class="displayName" href="${results.artist[0].display name}" target="_blank"></a><br />
      <a class="calendar" href="${results.artist.displayName.identifier[0].eventsHref}" target="_blank"</a><br />
      <a class="displayName" href="${results.artist[0].href}" target="_blank"</a><br />
      <a class="tour" href="${results.artist[0].onTourUntil}" target="_blank"></a><br />
      <a class="description" href="${results.artist[0].description}" target="_blank"></a><br /><br />
      `;
    $(".artShows").html(art);
  };

      //retrieve data from client side 
  function getEvents() {
    const eventIn = $('input[name=eventSearch]');
    const eventLoc = eventIn.val();
    $.getJSON(EVENT_URL, eventLoc, function(data) {
      showEvents(data);
    })
  }
   

     //display location results page
    function showEvents(results) {
       let loc = `
        <a class="title" href="${results.events.event[1].title}" target="_blank"></a><br />
        <a class="city_name" href="${results.events.event.[1].cityName}" target="_blank"</a><br />
        <a class="start_time" href="${results.events.event[1].start_time}" target="_blank"</a><br />
        <a class="venue_name" href="${results.events.event[1].venue_name}" target="_blank">/a><br />
        <img class="small" src=${results.events.event.image.small[1].url}" target="_blank">/a><br /><br />
        <a class="title" href="${results.articles[3].url}" target="_blank">${results.articles[3].title}<alt="${results.articles[3].description}"></a><br /><br />
        `;
      $(".locShows").html(loc);
    };

  

  function findUser() {
      const yourUsername = $('input[name=un]');
      const yourPassword = $('input[name=pass]');
      const userCred = {
        username: yourUsername,
        password: yourPassword
      }

      $.ajax({
          type: "POST",
          url: "USER_URL",
          query: ${userCred},

        success: function() {
            alert('Success!')
        },
        error: function() {
            alert('Error!')
        }
      });
    }

         
        /* $.ajax({
            type: " POST",
            url: "EVENT_URL",
            query: eventLoc,

          success: function() {
            alert('Success!')
            showEvents(data);
          },

          error: function() {
            alert('Error!')
          }
        });
    }*/

      //profile page  
    function getUser() {
      const currUN = $('input[name=currentUN]');
      const currPASS = $('input[name=currentPASS]');
      const currEMAIL = $('input[name=currentEMAIL]');

      const you = {
          username: currUN,
          password: currPASS,
          email: currEMAIL
        };

    $.ajax({
        type: " POST",
        url: "USER_URL",
        query: ${you},

      success: function() {
         alert('Success!')
      },
      error: function() {
         alert('Error!')
      }
    });
  }

     function displayUser() {
       for (index in data.user) {
         $('body').append(
           '<p>' + data.user.text + '</p>');
       }
     }

     function updateUser() {
        const newUsername = $('input[name=editUN]');
        const newPass = $('input[name=editPASS]');
        const newEmail = $('input[name=editEMAIL]');
        const newYOU = {
          username: newUsername,
          password: newPass,
          email: newEmail
        };

         $.ajax({
            type: "POST",
            url: "USER_URL",
            query: ${newYOU},

            success: function() {
              alert('Success!')
            },

            error: function() {
              alert('Error!')
            }
        });
      
    }
    function deleteUser() {
      const userId = user.id 
    };

        $.ajax({
            type: "POST",
            url: "USER_URL",
            query: ${user.id},

            success: function() {
              alert('Success!')
            },

            error: function() {
              alert('Error!')
            }
        });
      }
    
      $(() => {
        setEventListeners();
        showSignUpPage();
        openNav();
        $("body").removeClass("preload");
      })
