const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {type: String, require: [true, "Name is required"], unique: true},
    password: {type: String, require: [true, "Password is required"]},
});

const User = mongoose.model('User', userSchema);
module.exports = User;