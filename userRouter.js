const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  });

UserSchema.methods.serialize = function() {

  return {
    id: this._id,
    username: this.username,
    password: this.password,
    email: this.email
  };
}
const User = mongoose.model('User', UserSchema);

module.exports = {User};