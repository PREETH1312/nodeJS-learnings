require("dotenv").config();
const express = require("express");

const mongoose = require('mongoose');

//importing Different Schemas
const Book = require('./schema/book');
const Author = require('./schema/author');
const Publication = require('./schema/publication');


//database
const Database = require("./database");

mongoose.connect(process.env.MONGO_URI,{

}).then(()=> console.log('connection extablished!')).catch((Error) => {
  console.log(Error);
});
const { default: anymatch } = require("anymatch");
const BookModel = require("./schema/book");

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
ourAPP.get("/book", async (req, res) => {
  const getAllBooks =await Book.find();
  return res.json(getAllBooks);
});

// Route     - /book/:bookID
// Descripition   - To get a book based on ISBN
// Access     - Public
// Method     - GET
// Parameter - bookID
//Body     - none
ourAPP.get("/book/:bookID", async(req, res) => {
  const getSpecificBook =await Book.findOne({ISBN: req.params.bookID});
  return res.json({ book: getSpecificBook });
});

// Route     - /book/c/:category
// Descripition   - to get a list of books based on category
// Access     - Public
// Method     - GET
// Parameter - category
//Body     - none
ourAPP.get("/book/c/:category", async (req, res) => {
 const getSpecificBooks = await BookModel.find({
  category: req.params.category,
 });
 if(!getSpecificBooks){
  return res.json({error: `No book found for the category of ${req.params.category}`});
 }
 return res.json({books:getSpecificBooks});
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

ourAPP.get("/author", async(req, res) => {
  const getAllAuthors = await Author.find();
  return res.json(getAllAuthors);
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

ourAPP.post("/book/new", async (req,res) => {
   try{
    const{newBook} = req.body;
    await Book.create(newBook);
    return res.json({message: 'Book added to the database'})

   }catch(Error){
    return res.json({error: error.message})
   }
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

   Author.create(newAuthor);

    return res.json({ message: "Author added to the database"});
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

ourAPP.put("/book/update/:isbn" , async(req,res) => {
  const { title }=req.body.title;
  const updateBook = await Book.findOneAndUpdate(
  {
    ISBN: req.params.isbn,
  },
  {
    title:title,
  },
  {
    new:true,
  }
  )
  return res.json({book:updateBook});
});

// Route     - /bookAuthor/update/:isbn
// Descripition   -update/add new author to a book
// Access     - Public
// Method     - put
// Parameter - isbn
ourAPP.put("/bookAuthor/update/:isbn" ,async(req,res) => {
  const {newAuthor} =req.body;
  const{isbn} = req.params;
  const updateBook = await Book.findOneAndUpdate(
    {
      ISBN:isbn,
    },
    {
      $addToSet:{
        authors:newAuthor,
      },
    },
    {
      new: true,
    },
  );
 const updateAuthor = await Author.findOneAndUpdate(
  {
    id:newAuthor,
  },
  {
    $addToSet:{
      books: isbn
    },
  },
  {
    new:true,
  }
 );
 return res.json({
  books:updatedBook,
  authors:updatedAuthor,
  message:`New author was added into the database`
 });

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
