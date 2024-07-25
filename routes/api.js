const express = require('express');
const bookRoutes = require("./book");
const authRoutes = require("./auth");
const bookHolderRoutes = require("./bookHolder");

const app = express();

app.use("/book/",bookRoutes);
app.use("/auth/",authRoutes);
app.use("/bookHolder/",bookHolderRoutes);

module.exports = app;