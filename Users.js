const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MCart");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    contact_no: String,
    email: String
})

userSchema.plugin(plm);

module.exports = mongoose.model("Users", userSchema);