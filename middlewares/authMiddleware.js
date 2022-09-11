const protect = (req, res, next) => {
    const { user } = req.session;
    if (!user) {
        return res.status(404).json({
            status: false,
            message: "Please login to continue"
        })
    }
    req.user = user;
    next();
} 

module.exports = protect;