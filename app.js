const express = require('express')
const app = express();
const routes = require("./routes/api")
const mongoose = require('mongoose');
const response = require("./utils/response");
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/my-library")
    .then(() => {
        console.log("Connected to the database")
    })
    .catch((err) => {
        console.log("Error connecting to the database", err)
    });

app.use("/api", routes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        response.errorResponse(res,"You must logging",401)
    }
});

app.listen(5555, () => {
    console.log(`App listening on port 5555`)
    console.log("Backend Started...")
})
