const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  userName: String,
  age: String,
})
module.exports = mongoose.model('userDetails', UserSchema)
