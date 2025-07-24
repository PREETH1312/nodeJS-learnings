const Router = require('express').Router();

const PublicationModel = require('../schema/publication');


// Route     - /publication
// Descripition   - To get all publication
// Access     - Public
// Method     - GET
// Parameter - none
//Body     - none
Router.get("/",async (req, res) => {
  const getAllPublication =await PublicationModel.find();
  return res.json(getAllPublication);
});
// Route     - /publication/:publicationID
// Descripition   -to get specific publication
// Access     - Public
// Method     - GET
// Parameter - publicationID
//Body     - none
Router.get("/:publicationID",async(req, res) => {
  const getSpecificPublication =await PublicationModel.findOne({id: req.params.publicationID});
  return res.json({ publication: getSpecificPublication });
});

// Route     - /publication/p/:book
// Descripition   -  to get list of publication based on a book
// Access     - Public
// Method     - GET
// Parameter - publication
//Body     - none
Router.get("/p/:book", async(req, res) => {
 const getSpecificPublication = await PublicationModel.find({
  book: req.params.book,
 });
 if(!getSpecificPublication){
  return res.json({error: `No publication found for the book of ${req.params.book}`});
 }
 return res.json({books:getSpecificPublication});
});
// Route     - /publication/new
// Descripition   - to add new publication
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
Router.post("/new", async(req,res) => {
    try{
    const{newPublication} = req.body;
    await PublicationModel.create(newPublication);
    return res.json({message: 'Publication added to the database'})

   }catch(error){
    return res.json({error: error.message})
   }
});


// Route     - /publication/delete/:id
// Descripition   - to delete an publication
// Access     - Public
// Method     - delete
// Parameter - id

Router.delete("/delete/:id",async (req,res)=>{
  const { id } =req.params;
  const updatePublicationModal =await PublicationModel.findOneAndDelete({
    ID:id
  });
  return res.json({publications: updatePublicationModal});
});

// Route     - /publication/delete/book
// Descripition   - to delete an book from a publication
// Access     - Public
// Method     - delete
// Parameter - id,isbn
Router.delete("/delete/book/:isbn/:id", async(req,res) =>{
  const {isbn, id}= req.params;

  const updatedpublication = await PublicationModel.findOneAndUpdate({
    ISBN:isbn
  },
  {
    $pull:{
      books:parseInt(id),
    }
  },
  {
    new:true,
  }
);
const updatedbook = await BookModel.findOneAndUpdate({
  id:parseInt(id)
},
{
  $pull:{
    publications:isbn,
  }
},
{
  new:true,
}
);
return res.json({message:`book was deleted`,publication:updatedPublication,book:updatedBook});
});

// Route     - /publication/update
// Descripition   - update/ to add new publication
// Access     - Public
// Method     - put
// Parameter - id

Router.put("/update/:id" , async(req,res) => {
  const { books }=req.body.books;
  const updatePublicationModal = await PublicationModel.findOneAndUpdate(
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
  return res.json({publication:updatePublicationModal});
});
module.exports = Router;