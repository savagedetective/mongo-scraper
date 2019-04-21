var mongoose = require("mongoose");
var Note = require("./Note");


var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        required: false,
        unique: false
    },

    isSaved: {
        type: Boolean,
        default: false,
        unique: false
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;