const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require('./config/config');
const app = express();
app.use(express.json());
app.use(cors());
app.get("/api", (req, res) => {
    res.send("<h2>Hi There!!!! New in prod asdas ajhdajhjak</h2>")
    console.log("Runing in posrrr")
});
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    url: 'redis://redis:6379',
    legacyMode: true 
})
redisClient.connect().then(() => console.log("Redis connected")).catch(console.error);


const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: false
    })
        .then(() => console.log("Successfullty connected to db"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();
app.enable("trust proxy");
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        saveUninitialized: false, //deprecated
        httpOnly: true,
        saveUninitialized: false,
        resave: false,
        maxAge: 30000
    }
}))
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})