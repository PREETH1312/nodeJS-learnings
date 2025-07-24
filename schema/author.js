const mongoose = require("mongoose");

//Author schema
const AuthorSchema = mongoose.Schema({
   id : Number,
   name: String,
   books : [String],

});

//author model

const AuthorModel = mongoose.model("author", AuthorSchema);

module.exports = AuthorModel