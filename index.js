const express = require("express");

//database
const Database = require("./database");

//initialization
const ourAPP = express();

ourAPP.use(express.json());


ourAPP.get("/", (req, res) => {
   return res.json({
        message: "Request Served!!!!!"
    });
});
// Route     - /book
// Descripition   - To get a book
// Access     - Public
// Method     - GET
// Parameter - book
//Body     - none
ourAPP.get("/book",(req, res) => {
  return res.json({ books : Database.Book });
});

// Route     - /book/:bookID
// Descripition   - To get a book based on ISBN
// Access     - Public
// Method     - GET
// Parameter - bookID
//Body     - none



ourAPP.listen(4000, () => console.log("Server is running"));
