const express = require("express");

//database
const Database = require("./database");
const { default: anymatch } = require("anymatch");

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
// Route     - /book/a/:authors
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

// Route     - /author
// Descripition   - To get all author
// Access     - Public
// Method     - GET
// Parameter - none
//Body     - none

ourAPP.get("/author",(req, res) => {
  return res.json({ author : Database.Author });
});

// Route     - /author/:authorID
// Descripition   -  to get specific author
// Access     - Public
// Method     - GET
// Parameter - authorID
//Body     - none
ourAPP.get("/author/:authorID",(req, res) => {
  const getauthor = Database.Author.filter(
    (author) => author.name === req.params.authorID
  );
  return res.json({ author: getauthor });
});

// Route     - /author/:author
// Descripition   -  to get list of author based on a book
// Access     - Public
// Method     - GET
// Parameter - author
//Body     - none

ourAPP.get("/author/b/:book",(req, res) => {
  const getAuthorbyBook = Database.Author.filter(
    (author) => author.books.includes((req.params.book))
  );
  return res.json({ author: getAuthorbyBook });
});

// Route     - /book
// Descripition   - To get all publication
// Access     - Public
// Method     - GET
// Parameter - none
//Body     - none
ourAPP.get("/publication",(req, res) => {
  return res.json({ publications : Database.Publication });
});
// Route     - /author/:authorID
// Descripition   -to get specific publication
// Access     - Public
// Method     - GET
// Parameter - publicationID
//Body     - none
ourAPP.get("/publication/:publicationID",(req, res) => {
  const getPublication = Database.Publication.filter(
    (publication) => publication.name === req.params.publicationID
  );
  return res.json({ publication: getPublication });
});

// Route     - /publication/:publication
// Descripition   -  to get list of publication based on a book
// Access     - Public
// Method     - GET
// Parameter - publication
//Body     - none
ourAPP.get("/publication/p/:book",(req, res) => {
  const getPublicationbyBook = Database.Publication.filter(
    (publication) => publication.books.includes((req.params.book))
  );
  return res.json({ publication: getPublicationbyBook });
});

ourAPP.listen(4000, () => console.log("Server is running"));
