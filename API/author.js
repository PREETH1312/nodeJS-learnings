const Router = require('express').Router();

const BookModel = require('../schema/author');

Router.get("/author", async(req, res) => {
  const getAllAuthors = await Author.find();
  return res.json(getAllAuthors);
});
// Route     - /author/new
// Descripition   - to add new author
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
Router.post("/author/new", (req,res) => {
   const {newAuthor} = req.body;

   Author.create(newAuthor);

    return res.json({ message: "Author added to the database"});
});

// Route     - /author/:author
// Descripition   -  to get list of author based on a book
// Access     - Public
// Method     - GET
// Parameter - author
//Body     - none

Router.get("/author/b/:book",(req, res) => {
  const getAuthorbyBook = Database.Author.filter(
    (author) => author.books.includes((req.params.book))
  );
  return res.json({ author: getAuthorbyBook });
});

// Route     - /author/new
// Descripition   - to add new author
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
Router.post("/author/new", (req,res) => {
   const {newAuthor} = req.body;

   Author.create(newAuthor);

    return res.json({ message: "Author added to the database"});
});
Router.get("/author/:authorID",(req, res) => {
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

Router.get("/author/b/:book",(req, res) => {
  const getAuthorbyBook = Database.Author.filter(
    (author) => author.books.includes((req.params.book))
  );
  return res.json({ author: getAuthorbyBook });
});

// Route     - /author/:authorID
// Descripition   -  to get specific author
// Access     - Public
// Method     - GET
// Parameter - authorID
//Body     - none
Router.get("/author/:authorID",(req, res) => {
  const getauthor = Database.Author.filter(
    (author) => author.name === req.params.authorID
  );
  return res.json({ author: getauthor });
});

// Route     - /author/delete/:id
// Descripition   - to delete an author
// Access     - Public
// Method     - delete
// Parameter - id

Router.delete("/author/delete/:id",async (req,res)=>{
  const { id } =req.params;
  const updateAuthorDatabase =await AuthorModel.findOneAndDelete({
    ID:id
  });
  return res.json({authors: updateAuthorDatabase});
});

module.exports = Router;