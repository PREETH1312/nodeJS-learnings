const mongoose = require("mongoose");
const { Publication } = require("../database");

//create a book schema

const BookSchema = mongoose.Schema({
    ISBN:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    authors:[Number],
    language:String,
    pubDate: String,
    numofpage:Number,
    category:[String],
    Publication:Number,
});

// create a book model
const BookModel = mongoose.model("book", BookSchema);

module.exports = BookModel