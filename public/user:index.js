function handleNavigation() {

    $("nav a").click(function(event) {
        event.preventDefault();
        const currentPage = $(this).data("page");
        $(".page").hide();
        $(`.${currentPage}`).show();
    });

    function openNav() {
        document.getElementById("mySidenav").style.width = "15%";
        document.getElementById("main").style.marginLeft = "15%";
    }
    // Clear form values

    function setEventListeners() {
        handleNavigation();
    }

    //show start page
    function showLandingPage() {
        $(".page").hide();
        $(".landing-page").show();
    }

    //retrieve data from client side
    function getArtist() {
      const artistI=$('input[name=artistInput]');
        $.getJSON(artistURL, artistI, function(data) {
            showArtist(data);
        });

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
        const locateI=$('input[name=locationInput]');
        


        
        $.getJSON(locateURL, locateI, function(data) {
           showEvents(data);
        });

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

        function validateEmail() {

        }
      //profile page  
     function getUserFromDB(callback) {
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/users",
          "method": "GET",
          "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Postman-Token": "4d05b3cb-05af-225c-e80d-0c7f5e66bcbb"
        },
          "processData": false,
          "data": "{\"username\": \"db3\",\n\"password\": \"switch\",\n\"email\": \"some@gmail.com\"}"
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      });

     function displayUser(data) {
       for (index in data.user) {
         $('body').append(
           '<p>' + data.user.text + '</p>');
       }
     }

     function editUser(data) {
        var settings = {
          "async": true,
          "crossDomain": true,
          "method": "PUT",
          "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Postman-Token": "1c8b4b9c-37a7-e1e5-22a7-611e352da971"
        },
        "processData": false,
        "data": "{\"username\": \"db3\",\n\"password\": \"switch\",\n\"email\": \"some@gmail.com\"}"
        }

        $.ajax(settings).done(function (response) {
         console.log(response);
        });
      }

     app.put('/users', function(req,res) {
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
     function saveUserToDb() {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/users",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Postman-Token": "af84e50c-55f5-5b42-a1d9-09340fc52f3b"
        },
        "processData": false,
        "data": "{\"username\": \"db3\",\n\"password\": \"switch\",\n\"email\": \"some@gmail.com\"}"
        }

          $.ajax(settings).done(function (response) {
            console.log(response);
        });
     };

     function deleteUser() {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/users",
        "method": "DELETE",
        "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Postman-Token": "88163540-0acc-fb67-ddb8-6234a0fb9170"
        },
        "processData": false,
        "data": "{\"username\": \"db3\",\n\"password\": \"switch\",\n\"email\": \"some@gmail.com\"}"
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
  };

       // On load event:
      $(() => {
      	setEventListeners();
      	showStartPage();
        openNav();
          $("body").removeClass("preload");
        })

            