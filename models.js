const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const EventSchema = mongoose.Schema({
  title: String,
  city_name: String,
  start_time: [String],
   description: [String],
    venue_name: String,
    artist_name: String,
});

EventSchema.methods.serialize = function() {
  return {
    title: this.title,
    city_name: this.city_name,
    venue_name: this.venue_name,
    start_time: this.start_time,
    description: this.description,
     artist_name: this.artist_name,
  };
}

EventSchema.methods.getStart_Time = function() {
  return (this.start_time);
};

EventSchema.methods.getEvent = function() {
  return(this.title);
};

EventSchema.methods.getLocation = function() {
  return (this.city_name);
};

const UserSchema = mongoose.Schema({
  id: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}
});

UserSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email,
  };
}

const Event = mongoose.model('Event', EventSchema);
const Start = mongoose.model('Start_Time', EventSchema);
const Location = mongoose.model('Location', EventSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {User};
module.exports = {Event};
module.exports = {Location};
module.exports = {Start};
