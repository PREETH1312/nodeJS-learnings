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

// Route     - /book/new
// Descripition   - to add new book
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none

ourAPP.post("/book/new", (req,res) => {
   console.log(req.body);
    return res.json({ message: "book added successfully" });
});

// Route     - /author/new
// Descripition   - to add new author
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
ourAPP.post("/author/new", (req,res) => {
   const {newAuthor} = req.body;
   console.log(newAuthor);
    return res.json({ message: "author was added!"});
});

// Route     - /publication/new
// Descripition   - to add new publication
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
ourAPP.post("/publication/new", (req,res) => {
   const {publication} = req.body;
   console.log(publication);
    return res.json({ message: "publication was added!"});
});
// Route     - /book/update
// Descripition   - update/ to add new book
// Access     - Public
// Method     - put
// Parameter - isbn

ourAPP.put("/book/update/:isbn" ,(req,res) => {
  const {updatedBook} =req.body;
  const{isbn} = req.params;
   const book=Database.Book.map((book) => {
    if(book.ISBN === isbn) {
      return{...book,...updatedBook}
    }
    return book;
  });
  return res.json(Database.Book);
});

// Route     - /bookAuthor/update/:isbn
// Descripition   -update/ to add new author to a book
// Access     - Public
// Method     - put
// Parameter - isbn
ourAPP.put("/bookAuthor/update/:isbn" ,(req,res) => {
  const {newAuthor} =req.body;
  const{isbn} = req.params;
   const book= Database.Book.map((book) => {
    if(book.ISBN === isbn) {
      if(!book.authors.includes(newAuthor)){
         return book.authors.push(newAuthor);
      }
      return book;
    }
    return book;
  });
  const author =Database.Author.map((author) => {
    if(author.id === newAuthor) {
      if (!author.books.includes(isbn)){
        return author.books.push(isbn);
      }
      return author;
    }
    return author;
  })
  return res.json({book:book,author:author});
});

// Route     - /book/delete/:isbn
// Descripition   - to delete a book
// Access     - Public
// Method     - delete
// Parameter - none
//Body     - none

ourAPP.delete("/book/delete/:isbn", (req,res) => {
  const{isbn} =req.params;

  const filteredBooks =Database.Book.filter((book) => book.ISBN !== isbn);
  Database.Book =filteredBooks;
  return res.json(Database.Book);
});


ourAPP.listen(4000, () => console.log("Server is running"));
