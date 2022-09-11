const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.insertUser = async (req, res) => {
    try {
        let { username, password } = req.body;
        let pass = await bcrypt.hash(password, 12);
        let user = await User.create({
            username,
            password: pass
        });
        req.session.user = user;
        res.status(401).send({
            success: true,
            data: user,
            error: null
        })
    } catch (error) {
        res.status(401).send({
            success: false,
            data: null,
            error: error
        })
    }
};
exports.getUser = async (req, res) => {
    try {
        console.log("get all users")
        let users = await User.find({});
        res.status(401).send({
            success: true,
            data: users,
            error: null
        })
    } catch (error) {
        res.status(401).send({
            success: false,
            data: null,
            error: error
        })
    }
};
exports.login = async (req, res) => {
    try {
        let { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log("user", user)
        if (!user)
            return res.status(404).json({ status: "fail", message: "User not found" });
        let isCorrect = await bcrypt.compare(password, user.password);
        console.log("is", isCorrect)
        if (isCorrect) {
            console.log(req.session);
            req.session.user = user;
            console.log("req session", req.session);
            return res.status(200).json({ status: "success", message: "User found", data: user });
        }
        else {
            res.status(404).json({ status: "fail", message: "Password not correct" });
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            data: null,
            error: error
        })
    }
};