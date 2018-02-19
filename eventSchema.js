const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const EventSchema = mongoose.Schema({
  title: {type: String},
  city_name: {type: String},
  venue_address: {type: String},
  start_time: {type: String},
   description: {type: String},
  provider: {type: String},
  event_url: {type: String},
    venue_name: {type: String},
    artist_name: {type: String},
    artist_url: {type: String},
});

EventSchema.methods.serialize = function() {
  return {
    title: this.title,
    city_name: this.city_name,
    venue_name: this.venue_name,
    venue_address: this.venue_address,
    start_time: this.start_time,
    description: this.description,
    event_url: this.event_url,
     provider: this.provider,
     artist_name: this.artist_name,
     artist_url: this.artist_url

  };
}
const Event = mongoose.model('Event', EventSchema);
module.exports = {Event};
