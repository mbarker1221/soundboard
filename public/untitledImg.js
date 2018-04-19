
var eventTemplate = (
  '<li class="event-results-page">' +
    '<p><span class="event-title"></span></p>' +
    '<div class="event-controls">' +
      '<button class="event-toggle">' +
        '<span class="button-label">interested</span>' +
      '</button>' +
      '<button class="event-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

function showEvents(results) {

  const {title} = results.events.event.title,
  const {city_name} = results.events.event.city_name,
  const {start_time} = results.events.event.start_time, 
  const {description} =  results.events.event,description,
  const {venue_name} = results.events.event.venue_name,
  const {artist_name} = results.events.event.artist_name,
  const {image} = results.events.event.image.small.url
  };

  showEvents();


var artistTemplate = (
  '<div class="artist-results-page">' +
    '<h3 class="artist-name"><h3>' +
    '</br>' +
    '<ul class="artist-shows">' +
    '</ul>' +
    '<div class="artist-controls">' +
      '<button class="artist-event-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</div>'
);

var locateUrl = '/event';
var artistUrl = '/artist';


function getAndDisplayEvents() {
  console.log('Retrieving events')
  $.getJSON(locateUrl, function(event) {
    console.log('Rendering events');
    var eventsElement = events.map(function(event) {
      var element = $(eventTemplate);
      element.attr('id', event.id);
      element.find('.js-event-title').text(event.title);
      event.details.forEach(function(details) {
        element.find('.js-event-details').append(
          '<li>' + details + '</li>');
      });
      return element;
    });
    $('.js-events').html(eventsElement)
  });
}

function getAndDisplayArtist() {
  console.log('Retrieving artist');
  $.getJSON(artistUrl, function(artists) {
    console.log('Rendering artist');
    var artistElements = items.map(function(item) {
      var element = $(artistTemplate);
      element.attr('id', item.id);
      var artistName = element.find('.js-artist-name');
      artistName.text(artist.name);

     element.attr('data-checked', item.checked);
      if (item.checked) {
        itemName.addClass('artist__checked');
      }
      return element
    });
    $('.js-artist-list').html(itemElements);
  });
}




function deleteRecipe(recipeId) {
  console.log('Deleting recipe `' + recipeId + '`');
  $.ajax({
    url: RECIPES_URL + '/' + recipeId,
    method: 'DELETE',
    success: getAndDisplayRecipes
  });
}




function updateRecipe(recipe) {
  console.log('Updating recipe `' + recipe.id + '`');
  $.ajax({
    url: RECIPES_URL + '/' + recipe.id,
    method: 'PUT',
    data: recipe,
    success: function(data) {
      getAndDisplayRecipes();
    }
  });
}

function updateShoppingListitem(item) {
  console.log('Updating shopping list item `' + item.id + '`');
  $.ajax({
    url: SHOPPING_LIST_URL + '/' + item.id,
    method: 'PUT',
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayShoppingList()
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}


function handleRecipeAdd() {
  $('#js-recipe-form').submit(function(e) {
    e.preventDefault();
    var ingredients = $(
      e.currentTarget).find(
      '#ingredients-list').val().split(',').map(
        function(ingredient) { return ingredient.trim() });
    addRecipe({
      name: $(e.currentTarget).find('#recipe-name').val(),
      ingredients: ingredients
    });
  });
}

function handleShoppingListAdd() {

  $('#js-shopping-list-form').submit(function(e) {
    e.preventDefault();
    addShoppingItem({
      name: $(e.currentTarget).find('#js-new-item').val(),
      checked: false
    });
  });

}

function handleRecipeDelete() {
  $('.js-recipes').on('click', '.js-recipe-delete', function(e) {
    e.preventDefault();
    deleteRecipe(
      $(e.currentTarget).closest('.js-recipe').attr('id'));
  });
}

function handleShoppingListDelete() {
  $('.js-shopping-list').on('click', '.js-shopping-item-delete', function(e) {
    e.preventDefault();
    deleteShoppingItem(
      $(e.currentTarget).closest('.js-shopping-item').attr('id'));
  });
}

function handleShoppingCheckedToggle() {
  $('.js-shopping-list').on('click', '.js-shopping-item-toggle', function(e) {
    e.preventDefault();
    var element = $(e.currentTarget).closest('.js-shopping-item');

    var item = {
      id: element.attr('id'),
      checked: !JSON.parse(element.attr('data-checked')),
      name: element.find('.js-shopping-item-name').text()
    }
    updateShoppingListitem(item);
  });
}

$(function() {
  getAndDisplayShoppingList();
  handleShoppingListAdd();
  handleShoppingListDelete();
  handleShoppingCheckedToggle();

  getAndDisplayRecipes();
  handleRecipeAdd();
  handleRecipeDelete();
});
