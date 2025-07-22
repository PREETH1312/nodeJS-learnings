const Router = require('express').Router();

const { Author } = require('../database');
const BookModel = require('../schema/author');

Router.get("/author", async(req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});
// Route     - /author/new
// Descripition   - to add new author
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
Router.post("/author/new", async(req,res) => {
 try{
    const{newAuthor} = req.body;
    await Author.create(newAuthor);
    return res.json({message: 'Author added to the database'})

   }catch(Error){
    return res.json({error: error.message})
   }
    return res.json({ message: "Author added successfully" });
});

// Route     - /author/:book
// Descripition   -  to get list of author based on a book
// Access     - Public
// Method     - GET
// Parameter - author
//Body     - none

Router.get("/author/b/:book",async(req, res) => {
 const getSpecificAuthor = await AuthorModel.find({
  book: req.params.book,
 });
 if(!getSpecificAuthor){
  return res.json({error: `No author found for the book of ${req.params.book}`});
 }
 return res.json({books:getSpecificAuthor});
});

// Route     - /author/:authorID
// Descripition   -  to get specific author
// Access     - Public
// Method     - GET
// Parameter - authorID
//Body     - none
Router.get("/author/:authorID", async(req, res) => {
  const getSpecificAuthor =await AuthorModel.findOne({ISBN: req.params.authorID});
  return res.json({ book: getSpecificAuthor });
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