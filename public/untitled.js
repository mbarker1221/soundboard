var $ = require('jquery');

const MUSIC_URL = EVENT_URL;
const apiKey = 'AIzaSyB6LDXCfWtsPmqUn9qLGPtPvoluS0tKmBE';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: MUSIC_URL,
    data: {
      part: 'snippet',
      key: apiKey,
      q: `${searchTerm} in:name`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
$.ajax(settings);
}

function displayResult(result) {
   $("#eventSearch").val('');
  return `
  <div>
	  <h2>

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

	  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${results.events.event[0].image.medium.url}"></a>
	</div> 
      `;
}

function displayYoutubeSearchResults(data) {
 const searchResults = data.items.map((item, index) => displayResult(item));

 $('.js-search-results').html(searchResults);
}

function watchSubmit() {
  $('.js-search-form').submit(function( event ) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
  
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchResults);
 
  });
}
$(watchSubmit);






