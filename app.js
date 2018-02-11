const MOCK_EVENTS = {
	"events": [
	{ 
	 "id": "123",
	 "title": "Rock Star",
     "venue_name" : "this place",
	 "start_date" : "2018-23-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.RockStar@eventful.com"
	},

	{
	 "id": "456",
	 "title": "Rap Star",
     "venue_name" : "this place",
	 "start_date" : "2018-25-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.rapStar@eventful.com"
	},

	{
	 "id": "789",
	 "title": "Country Star",
     "venue_name" : "that place",
	 "start_date" : "2018-27-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.CountryStar@eventful.com"
	},
	
	{
	 "id": "012",
	 "title": "Electronic Star",
     "venue_name" : "the other place",
	 "start_date" : "2018-20-02, 19:00:00",
	 "city_name": "Atlanta",
	 "description": "An all ages show with music",
	 "url": "www.danceYourAssOff@eventful.com"
	}
  ]
};

function getEvents(callback) {
setTimeout(function() { 
	callback(MOCK_EVENTS)}, 2);
}

function displayEvents(data) {
	for(index in data.Events) {
		$('body').append(
			'<p>' + data.Event[index].text + '<p>');
	}
}

function getAndDsiplayEvents() {
	getEvents(displayEvents);
}

$(function() {
	getAndDisplayEvents();
})
const MOCK_USERS = {
	"users": [
	{ 
	 "username": "rock_on",
	 "password": "pass",
     "email" : "rock@email.com",
	},

	{"username": "rock_in",
	 "password": "pass",
     "email" : "rockin@email.com",
	},

	{
	 "username": "rock_out",
	 "password": "pass",
     "email" : "rockout@email.com",
	},
	
	{
	"username": "rock_it",
	 "password": "pass",
     "email" : "rockit@email.com",
	}
  ]
};
function getUsers(callback) {
setTimeout(function() {callback(MOCK_USERS)}, 100);
}

function displayUsers(data) {
	for(index in data.Users) {
		$('body').append(
			'<p>' + data.Users[index].text + '<p>');
	}
}

function getAndDisplayUsers() {
	getUsers(displayUsers);
}

$(function() {
	getAndDisplayUsers();
})

