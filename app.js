const express = require('express')
const app = express();
const routes = require("./routes/api")
const mongoose = require('mongoose');
const response = require("./utils/response");
const dotenv = require('dotenv');

dotenv.config({path: './.env.test'});
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to the database")
    })
    .catch((err) => {
        console.log("Error connecting to the database", err)
    });

app.use("/api", routes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        response.errorResponse(res,"You must login",401)
    }
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`)
    console.log("Backend Started...")
})
