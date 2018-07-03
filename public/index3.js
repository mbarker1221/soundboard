/*global jQuery, Handlebars, Router */
'use strict';

jQuery(function ($) {

  const store = {
    setUsers(data) {
      this._users = data;
    },
      setFilter(filter) {
      this.filter = (filter) ? filter : 'all';
    },
    getUserById(id) {
      return this._users.find(user => user.id === id);
    },
    deleteUserById(id) {
      this._users = this._users.filter(user => user.id !== id);
    },
    updateUserById(id, update) {
      let user = this.getUserById(id);
      if (user) {
        Object.assign(user, update);
      }
      return user;
    },
    getAllUsers: function () {
      return this._users;
    },
  };
  const api = {
    init: function (serverBase) {
      this.serverBase = serverBase;
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

  const app = {
    init: function () {
      const hash = location.hash.split('/')[1];
      store.setFilter(hash);
      api.read()
        .then((data) => {
          store.setUser(data);
          this.bindEvents();
          this.render();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    
  bindEvents: function () {
      $(window).on('hashchange', this.updateFilter.bind(this));
      $('#createNewUser').on('click', this.toggleNewUser.bind(this));
      $('#submitUser').on('click', this.toggleOldUser.bind(this));
      $('#restart').on('click', this.renderPage.bind(this));
      $('#btnFindArtist').on('click', this.getArtist.bind(this));
      $('#btnGetEvents').on('click', this.getEvents.bind(this));
      $('#sign_up_button').on('click', this.toggleSignUp.bind(this));
      $('#sign_in_button').on('click', this.toggleSignIn.bind(this));
      $('#updateU').on('click', this.updateUser.bind(this));
      $('#submitFav').on('click', this.getNotifications.bind(this));
      $('#delete').on('click', this.deleteUser.bind(this));
      $('#resync').on('click', this.renderPage.bind(this));
      $('#rerun').on('click', this.renderPage.bind(this));
      $('#replay').on('click', this.renderPage.bind(this));
      $('#redo').on('click', this.renderPage.bind(this));
    },

  hideUnusedSections: function () {
  $("#landing_page").hide();
  $("#artist_results_page").hide();
  $("#event_results_page").hide();
  $("#sign_up_page").hide();
  $("#sign_in_page").hide();
  $("#profile_page").hide();
  $("#editPage").hide();
  $("#updatePage").hide();
  $("#deletePage").hide();
}
        

renderPage: function () {
  hideUnusedSections();
  $("#landing_page").show();
}



     getArtist: function () {
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
    }
  };
  
  $.ajax(settings).done(function(response) {
    showArtist(response);
  });
}

  function showArtist(response) {
    hideUnusedSections();
  $("#artist_results_page").show();
  $("#artistSearch").val('');
  var id = results.performers.performer[0].url;
  $("#id").text(id);
  var name = results.performers.performer[0].name;
  $("#name").text(name);
}
    updateFilter: function () {
      store.filter = location.hash.split('/')[1];
    },
   
hideUnusedSections: function () {
  $("#landing_page").hide();
  $("#artist_results_page").hide();
  $("#event_results_page").hide();
  $("#sign_up_page").hide();
  $("#sign_in_page").hide();
  $("#profile_page").hide();
  $("#editPage").hide();
  $("#updatePage").hide();
  $("#deletePage").hide();
}
        

renderPage: function () {
  hideUnusedSections();
  $("#landing_page").show();
}
getCurrentUser: function (event) {
    const currU = $(event.target);
  const id = this.getIdFromCurrU(event.target);
  const user = store.getUserById(id);
  var newUsername = $("input[name=you]").val();
  var newPassword = $("input[name=youPass]").val();
  const updatedUser = {
    username: newUsername,
    password: newPassword
};

  api.update(id, updatedUser)
  .then(res => {
    store.updateUserById(res.id, res);
  }).catch((err) => {
    console.error(err);
  });
},
    
   
    createNewUser: function (e) {
      const id = this.user.id;
      
      const user = store.getUserById(id);
console.log(user)
      const updatedUser = {
      username: user.username,
      password: user.password
      };

      api.update(id, updatedUser)
        .then(res => {
          store.updateUserById(res.id, res);

        }).catch((err) => {
          console.error(err);
        });
    },
    editMode: function (e) {
      const input = $(e.target).closest('li').addClass('editing').find('.edit');
      input.val(input.val()).focus();
    },
  
    updateUserById: function (event) {
      const el = $(event.target);
      const id = this.getIdFromEl(event.target);
      const user = store.getUserById(id);  
      var newUsername = $("input[name=updateUN]").val();
      var newPassword = $("input[name=updatePASS]").val();
      const updatedUser = {
        username: newUsername,
        password: newPassword
      }
      api.update(id, updatedUser)
        .then(res => {
          store.updateUserById(res.id, res);
          this.render();
        }).catch((err) => {
          console.error(err);
        });
    },
     deleteUser: function (event) {
      const id = this.getIdFromEl(event.target);
      api.delete(id)
        .then(() => {
          store.deleteUserById(id);
          this.render();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  let params = new URLSearchParams(location.search.slice(1));
  let serverBase = `${window.location.origin}/user`;
  api.init(serverBase);
  app.init();

});
