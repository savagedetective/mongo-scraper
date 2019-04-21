//requires dependencies
var express = require("express");
var exphbs = require("express-handlebars");

var logger = require("morgan");
var mongoose = require("mongoose");

//requires scrapers
var axios = require("axios");
var cheerio = require('cheerio');

//requires models
var db = require("../models");

var router = express.Router();

//let the routes begin...
router.get("/", function (req, res) {
    res.render("index", hbsObject);
});


module.exports = router;