const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: {type: String, required: [true, "Title is required"]},
    body: {type: String, required: [true, "Body is required"]},
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;