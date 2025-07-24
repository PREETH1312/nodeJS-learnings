const Router = require('express').Router();

const { Author } = require('../database');
const AuthorModel = require('../schema/author');

Router.get("/", async(req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});
// Route     - /author/new
// Descripition   - to add new author
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
Router.post("/new", async(req,res) => {
 try{
    const{newAuthor} = req.body;
    await AuthorModel.create(newAuthor);
    return res.json({message: 'Author added to the database'})

   }catch(error){
    return res.json({error: error.message})
   };
});

// Route     - /author/:book
// Descripition   -  to get list of author based on a book
// Access     - Public
// Method     - GET
// Parameter - author
//Body     - none

Router.get("/b/:book",async(req, res) => {
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
Router.get("/:authorID", async(req, res) => {
  const getSpecificAuthor =await AuthorModel.findOne({id: req.params.authorID});
  return res.json({ author: getSpecificAuthor });
});

// Route     - /author/delete/:id
// Descripition   - to delete an author
// Access     - Public
// Method     - delete
// Parameter - id

Router.delete("/delete/:id",async (req,res)=>{
  const {id} =req.params;
  const updateAuthorModel =await AuthorModel.findOneAndDelete({
    id:id  });
  return res.json({authors: updateAuthorModel});
});

// Route     - /author/update
// Descripition   - update/ to add new author
// Access     - Public
// Method     - put
// Parameter - id

Router.put("/update/:id" , async(req,res) => {
  const { books }=req.body.books;
  const updateAuthorModal = await AuthorModel.findOneAndUpdate(
  {
    id: req.params.id,
  },
  {
    books:books,
  },
  {
    new:true,
  }
  )
  return res.json({author:updateAuthorModal});
});

module.exports = Router;