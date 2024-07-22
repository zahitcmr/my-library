const express = require('express');
const bookRoutes = require("./book");
const authRoutes = require("./auth");

const app = express();

app.use("/book/",bookRoutes);
app.use("/auth/",authRoutes);

module.exports = app;