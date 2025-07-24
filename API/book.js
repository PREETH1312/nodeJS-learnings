const Router = require('express').Router();

const BookModel = require('../schema/book');
const AuthorModel = require('../schema/author');

// Route     - /book
// Descripition   - To get a book
// Access     - Public
// Method     - GET
// Parameter - none
//Body     - none
Router.get("/", async (req, res) => {
  const getAllBooks  =await BookModel.find();
  return res.json(getAllBooks);
});

// Route     - /book/:bookID
// Descripition   - To get a book based on ISBN
// Access     - Public
// Method     - GET
// Parameter - bookID
//Body     - none
Router.get("/:bookID", async(req, res) => {
  const getSpecificBook =await BookModel.findOne({ISBN: req.params.bookID});
  return res.json({ book: getSpecificBook });
});

// Route     - /book/c/:category
// Descripition   - to get a list of books based on category
// Access     - Public
// Method     - GET
// Parameter - category
//Body     - none
Router.get("/c/:category", async (req, res) => {
 const getSpecificBooks = await BookModel.find({
  category: req.params.category,
 });
 if(!getSpecificBooks){
  return res.json({error: `No book found for the category of ${req.params.category}`});
 }
 return res.json({books:getSpecificBooks});
});
// Route     - /book/a/:author
// Descripition   - to get a list of books based on author
// Access     - Public
// Method     - GET
// Parameter - authors
//Body     - none
Router.get("/a/:authors",async (req, res) => {
 const getSpecificBooks = await BookModel.find({
  authors: req.params.authors,
 });
 if(!getSpecificBooks){
  return res.json({error: `No book found for the author of ${req.params.authors}`});
 }
 return res.json({books:getSpecificBooks});
});
// Route     - /book/new
// Descripition   - to add new book
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none

Router.post("/new", async (req,res) => {
   try{
    const{newBook} = req.body;
    await BookModel.create(newBook);
    return res.json({message: 'Book added to the database'})

   }catch(error){
    return res.json({error: error.message});
   };
});

// Route     - /book/update
// Descripition   - update/ to add new book
// Access     - Public
// Method     - put
// Parameter - isbn

Router.put("/update/:isbn" , async(req,res) => {
  const { title }=req.body.title;
  const updateBookModal = await BookModel.findOneAndUpdate(
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
  return res.json({book:updateBookModal});
});

// Route     - /book/delete/:isbn
// Descripition   - to delete a book
// Access     - Public
// Method     - delete
// Parameter - none
//Body     - none

Router.delete("/delete/:isbn", async(req,res) => {
  const{isbn} =req.params;
  const updateBookModel =await BookModel.findOneAndDelete({
    ISBN:isbn
  });
  return res.json({books: updateBookModel});
});

// Route     - /book/delete/author
// Descripition   - to delete author from a book
// Access     - Public
// Method     - delete
// Parameter - id,isbn

Router.delete("/delete/author/:isbn/:id", async(req,res) =>{
  const {isbn, id}= req.params;

  const updateBookModel = await BookModel.findOneAndUpdate({
    ISBN:isbn
  },
  {
    $pull:{
      authors:parseInt(id),
    }
  },
  {
    new:true,
  }
);
const updateAuthorModel = await AuthorModel.findOneAndUpdate({
  id:parseInt(id)
},
{
  $pull:{
    books:isbn,
  }
},
{
  new:true,
}
);
return res.json({message:`Author was deleted`,book:updateBookModel,author:updateAuthorModel});
});
// Route     - /bookAuthor/update/:isbn
// Descripition   -update/add new author to a book
// Access     - Public
// Method     - put
// Parameter - isbn
Router.put("/bookAuthor/update/:isbn" ,async(req,res) => {
  const {newAuthor} =req.body;
  const{isbn} = req.params;
  const updatedBook = await BookModel.findOneAndUpdate(
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
    }
  );
  
 const updatedAuthor = await AuthorModel.findOneAndUpdate(
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

module.exports = Router;
