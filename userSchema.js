const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  id: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}
});

userSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email,
  };
}

const User = mongoose.model('User', userSchema);
module.exports = {User};
