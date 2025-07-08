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
// Parameter - none
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
ourAPP.get("/book/:bookID",(req, res) => {
  const getBook = Database.Book.filter(
    (book) => book.ISBN === req.params.bookID
  );
  return res.json({ book: getBook });
});
// Route     - /book/c/:category
// Descripition   - to get a list of books based on category
// Access     - Public
// Method     - GET
// Parameter - category
//Body     - none
ourAPP.get("/book/c/:category",(req, res) => {
  const getBook = Database.Book.filter(
    (book) => book.category.includes(req.params.category)
  );
  return res.json({ book: getBook });
});
// Route     - /book/c/:authors
// Descripition   - to get a list of books based on author
// Access     - Public
// Method     - GET
// Parameter - authors
//Body     - none
ourAPP.get("/book/a/:authors",(req, res) => {
  const getBookByAuthor = Database.Book.filter(
    (book) => book.authors.includes(parseInt(req.params.authors))
  );
  return res.json({ book: getBookByAuthor });
});



ourAPP.listen(4000, () => console.log("Server is running"));
