const Post = require('../models/post');

const self = {
    insertPost: async (req, res) => {
        try {
            let post = new Post(req.body);
            await post.save();
            res.status(200).send({
                success: true,
                data: post,
                error: null
            })
        } catch (error) {
            res.status(401).send({
                success: false,
                data: null,
                error: error
            })
        }
    },
    getPost: async (req, res) => {
        try {
            console.log("get all posts")
            let posts = await Post.find({});
            res.status(401).send({
                success: true,
                data: posts,
                error: null
            })
        } catch (error) {
            res.status(401).send({
                success: false,
                data: null,
                error: error
            })
        }
    }
};
module.exports = self;