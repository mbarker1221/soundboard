const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const eventSchema = mongoose.Schema({
  title: String,
  city_name: String,
  start_time: [String],
  description: [String],
  venue_name: String,
  artist_name: String,
});

eventSchema.methods.serialize = function() {
  return {
    title: this.title,
    city_name: this.city_name,
    venue_name: this.venue_name,
    start_time: this.start_time,
    description: this.description,
    artist_name: this.artist_name,
  };
}

eventSchema.methods.getEvent = function() {
  return(this.title);
};

eventSchema.methods.getStart_Time = function() {
  return (this.start_time);
};

eventSchema.methods.getLocation = function() {
  return (this.city_name);
};

eventSchema.methods.showEvents = function() {
  return (this.title); 
};

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
});

userSchema.virtual('userData').get(function() {
  return `${this.user.username} ${this.user.password} ${this.user.email}`;
});

userSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email,
  };
};

const event = mongoose.model('event', eventSchema);
const Start = mongoose.model('Start_Time', eventSchema);
const Location = mongoose.model('Location', eventSchema);
const user = mongoose.model('user', userSchema);

module.exports = {event};
module.exports = {Location};
module.exports = {Start};
module.exports = {user};
//module.exports = {users: createUsersModel()}

