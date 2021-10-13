const express = require("express");
const dotenv = require("dotenv");
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const connectDatabase = require('./helpers/database/connectDatabase')
const routers = require("./routers");
const path = require("path");
const {imageUpload} = require('./controllers/auth');
const upload = require('./middlewares/libraries/upload');
const {getAccessToRoute} = require('./middlewares/authorization/auth');

//Envorinment Variables

dotenv.config({

    path: "./config/env/config.env"

});

//Mongodb Connection
connectDatabase();

const app = express();

//Express Body-Middleware

app.use(express.json());

const PORT =  process.env.PORT;

//Routers Middlewares

app.use("/api",routers);

app.get("/", (req,res) => {

    res.send("hello question api");

});


//Static Files

app.use(express.static(path.join(__dirname, "public")));

//Error Middlewares
app.use(customErrorHandler);



app.post('/upload', [getAccessToRoute,upload],imageUpload)

app.listen(PORT, () => {
    console.log(`${PORT} dinleniyor ve ${process.env.NODE_ENV}`);
});