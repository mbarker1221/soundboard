Event.find(function(err, events) {
	if(err) return console.error(err);
	if(event.length) return; 

	event ({
	 "title": "Rock Star",
	 "city_name": "Atlanta",
	 "start_date" : "2018-23-02, 19:00:00",
	 "description": "An all ages show with music",
     "venue_name" : "this place",
     "artist_name": "your fav rock star",
     "url": "url",
     "recently_added": Boolean,
	}).save();

	event ({
	 "title": "Rap Star",
	 "city_name": "Atlanta",
	 "start_date" : "2018-25-02, 19:00:00",
	 "description": "An all ages show with music",
	 "venue_name" : "this place",
	 "artist_name": "your fav rap star",
	 "url": "url",
     "recently_added": Boolean,
	}).save();

	event ({ 
	 "title": "Country Star",
	 "city_name": "Atlanta",   
	 "start_date" : "2018-27-02, 19:00:00",
	 "venue_name" : "that place",
	 "description": "An all ages show with music",
	 "artist_name": "your fav country star",
	 "url": "url",
     "recently_added": Boolean,
	}).save();
	
	event ({
	 "title": "Electronic Star",
	 "city_name": "Atlanta",    
	 "start_date" : "2018-20-02, 19:00:00",
	 "venue_name" : "the other place",
	 "description": "An all ages show with music",
	 "artist_name": "your fav country star",
	 "url": "url",
     "recently_added": Boolean,
	}).save();
});

User.find(function(err, events) {
	if(err) return console.error(err);
	if(user.length) return; 

	user({ 
	 "username": "rock_on",
	 "password": "pass",
     "email" : "rock@email.com",
	}).save();

	user({ 
	{"username": "rock_in",
	 "password": "pass",
     "email" : "rockin@email.com",
	}).save();

	user({ 
	 "username": "rock_out",
	 "password": "pass",
     "email" : "rockout@email.com",
	}).save();
	
	user({ 
	"username": "rock_it",
	 "password": "pass",
     "email" : "rockit@email.com",
	}).save();
});
  
