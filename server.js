//requires dependencies
var express = require("express");
var exphbs = require("express-handlebars");

var logger = require("morgan");
var mongoose = require("mongoose");

//requires scrapers
var axios = require("axios");
var cheerio = require('cheerio');

//requires models
var db = require("./models");

var PORT = process.env.PORT || 3000;

//start express
var app = express();

//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//handlebars
app.engine("handlebars", exphbs ({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//mongo connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//starts server
app.listen(PORT, function() {
    console.log("Server is GO on PORT: " + PORT);
})