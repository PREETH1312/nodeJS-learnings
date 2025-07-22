require("dotenv").config();
const express = require("express");

const mongoose = require('mongoose');

//database
const Database = require("./database");

mongoose.connect(process.env.MONGO_URI,{

}).then(()=> console.log('connection extablished!')).catch((Error) => {
  console.log(Error);
});
const { default: anymatch } = require("anymatch");
const BookModel = require("./schema/book");
const AuthorModel = require("./schema/author");
const PublicationModel = require("./schema/publication");

//initialization
const ourAPP = express();

ourAPP.use(express.json());

//microservices
ourAPP.use("/book", Book );
ourAPP.use("/author", Author );
ourAPP.use("/publication", Publication );


ourAPP.get("/", (req, res) => {
   return res.json({
        message: "Request Served!!!!!"
    });
});


ourAPP.listen(4000, () => console.log("Server is running"));
