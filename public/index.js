function handleNavigation() {

    $('nav a').click(function(event) {
        event.preventDefault();
        const currentPage = $(this).data("page");
    $('.page').hide();
    $(`.${currentPage}`).show();
  });

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
        $("#sign-in-page").hide();
        $("#sign-up-page").show();
    };
    function toggleRegistration() {
      $('#sign-in-link').show();
      $('.container').hide();
      $('.link').click(function(event) {
        event.preventDefault();
        $('.container').show();
        $('#sign-in-page').show();
      })
    };

    function createUserStorage() {
       const userUN = $('input[name=username]');
       const userPASS = $('input[name=password]');
       const userEMAIL = $('input[name=email]');
       storeUser();
     }
     function storeUser() {
       const userNew = {
          username: userUN,
          password: userPASS,
          email: userEMAIl
       };
       return userNew;
     };
     

    function validateUsername() {}

    
    function validatePass() {}

    
    function validateEmail() {}
        

    function authorizeUsername() {}

    
    function authorizePass() {}
      

    
function addNewUser() {
      

         $.ajax({
            type: "POST",
            url: "./server.js",
            query: ${userNew},
      

          success: function() {
              alert('Success!')
          },

          error: function() {
              alert('Error!')
          }
      });
       };

    function findUser() {
      const yourUsername = $('input[name=un]');
      const yourPassword = $('input[name=pass]');
      const userCred = {
        username: yourUsername,
        password: yourPassword
      }

      $.ajax({
          type: "GET",
          url: "./server.js",
          query: ${userCred},
         

        success: function() {
            alert('Success!')
        },
        error: function() {
            alert('Error!')
        }
      });
    }

    //retrieve data from client side
function showEvents() {
  $.getJson(URL, function(data) {
    show event(data)
  })
}

function showEventData(results) {};


function showArtist() {
  $.getJson(URL, function(data) {
    show artist(data)
  })
}

function showArtistData(results) {};



  function getArtist() {
    const artistIn = $('input[name=artistSearch]');
        
      $.ajax({
        type: "POST",
        url: "./eventsRouter.js",
        query: ${artistIn},
    

      success: function() {
        alert('Success!')
      },

      error: function() {
        alert('Error!')
      }
    });
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
    let params={
      eventLoc: eventIn.val();
    };
         
         $.ajax({
            type: "POST",
            url: "./EventsRouter.js",
            query: params,
       

          success: function() {
            //show content
            alert('Success!')
          },

          error: function() {
            //show error message
            alert('Error!')
          }
        });
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

      //profile page  
    function getUser() {
      const currUN = $('input[name=currentUN]');
      const currPASS = $('input[name=currentPASS]');
      const currEMAIL = $('input[name=currentEMAIL]');

      const you = {
          username: currUN,
          password: currPASS,
          email: currEMAIL
        }

    $.ajax({
        type: "POST",
        url: "/server.js",
        query: ${you},
       

      success: function() {
          //show content
         alert('Success!')
      },

      error: function() {
          //show error message
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
        }

         $.ajax({
            type: "POST",
            url: "/server.js",
            query: ${newYOU},
          

            success: function() {
              //show content
              alert('Success!')
            },

            error: function() {
              //show error message
              alert('Error!')
            }
        }
      });
    }

    //postItem()
     app.put('/user', function(req,res) {
        db.users.this(user),
          function(err, users) {
            let context = {
              user: user.map(function(user) {
              return{
                username: this.username,
                password: this.password,
                email: this.email,} 
              })
            }
           }

        if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
          const message = (`information is not a match`);
            console.error(message);
            return res.status(400).json({
              message: message
            });
          }
            const toUpdate = {};
            const updateableFields = ['username', 'password', 'email'];

            updateableFields.forEach(field => {
              if (field in req.body) {
                toUpdate[field] = req.body[field]
              }
            });

        User
          .this(req.params.id, {$set: toUpdate})
          .then(user => res.status(204) 
          .catch(err => res.status(500).json({
              message: 'Internal server error'
          }))
        )
      });
    };
     
     function deleteUser() {
      const userDel = $('input[name=eventSearch]');
         $.ajax({
            type: "POST",
            url: "/eventsRouter.js",
            query: ${eventIn},
        

            success: function() {
                alert('Success!')
            },
            error: function() {
                alert('Error!')
            }
        });
     }

       // On load event:
      $(() => {
        setEventListeners();
        showSignUpPage();
        openNav();
        $("body").removeClass("preload");
      })
