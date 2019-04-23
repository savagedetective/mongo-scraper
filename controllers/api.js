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

//home page
router.get("/", function (req, res) {

    console.log("main page accessed");

    db.Article.find({ isSaved: false })
        .then(function (dbArticle) {

            var hbsObject = {
                articles: dbArticle
            };

            res.render("index", hbsObject);
            console.log("main page loaded");
        })

        .catch(function (error) {
            res.json(error);
        });

});

//saved article page
router.get("/saved", function (req, res) {

    console.log("saved page accessed");

    db.Article.find({ isSaved: true })
        .then(function (dbArticle) {

            var hbsObject = {
                articles: dbArticle
            };

            res.render("saved", hbsObject);
            console.log("saved page loaded");
        })

        .catch(function (error) {
            res.json(error);
        });

});

//route to scrape NYT
router.get("/scrape", function (req, res) {

    console.log("scrape is running.");

    axios.get("https://www.nytimes.com/")

        .then(function (response) {

            var $ = cheerio.load(response.data);

            $("article").each(function (i, element) {

                var result = {};

                result.title = $(element)
                    .find("h2")
                    .text();
                result.link = "https://www.nytimes.com" + $(element)
                    .find("a")
                    .attr("href");
                result.summary = $(element)
                    .find("p")
                    .text();

                if (result.title && result.link && result.summary) {

                    db.Article.create(result);
                    console.log("Article successfully created.");

                } else {
                    console.log("Article was not created.");
                };

            });

        })

        .catch(function (err) {
            console.log(err);
        });
});

//api articles
router.get("/articles", function (req, res) {

    console.log("api articles page accessed");

    db.Article.find({})
        .then(function (dbArticle) {

            res.json(dbArticle);

        })

        .catch(function (error) {
            res.json(error);
        });

});

//route to save articles
router.put("/save/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: true })
        .then(function (data) {

            res.json(data);

        })
        .catch(function (err) {

            res.json(err);

        });
});

//route to remove saved articles
router.put("/remove/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: false })
        .then(function (data) {

            res.json(data)

        })
        .catch(function (err) {

            res.json(err);

        });
});

module.exports = router;