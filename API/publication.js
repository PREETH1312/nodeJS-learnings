const PublicationModel = require('./schema/publication');

const Router = require('express').Router();
// Route     - /publication
// Descripition   - To get all publication
// Access     - Public
// Method     - GET
// Parameter - none
//Body     - none
Router.get("/publication",(req, res) => {
  return res.json({ publications : Database.Publication });
});
// Route     - /publication/:publicationID
// Descripition   -to get specific publication
// Access     - Public
// Method     - GET
// Parameter - publicationID
//Body     - none
Router.get("/publication/:publicationID",(req, res) => {
  const getPublication = Database.Publication.filter(
    (publication) => publication.name === req.params.publicationID
  );
  return res.json({ publication: getPublication });
});

// Route     - /publication/p/:book
// Descripition   -  to get list of publication based on a book
// Access     - Public
// Method     - GET
// Parameter - publication
//Body     - none
Router.get("/publication/p/:book",(req, res) => {
  const getPublicationbyBook = Database.Publication.filter(
    (publication) => publication.books.includes((req.params.book))
  );
  return res.json({ publication: getPublicationbyBook });
});
// Route     - /publication/new
// Descripition   - to add new publication
// Access     - Public
// Method     - post
// Parameter - none
//Body     - none
Router.post("/publication/new", (req,res) => {
   const {publication} = req.body;
   console.log(publication);
    return res.json({ message: "publication was added!"});
});
// Route     - /publication/delete/:id
// Descripition   - to delete an publication
// Access     - Public
// Method     - delete
// Parameter - id

Router.delete("/publication/delete/:id",async (req,res)=>{
  const { id } =req.params;
  const updatePublicationDatabase =await PublicationModel.findOneAndDelete({
    ID:id
  });
  return res.json({publications: updatePublicationDatabase});
});

// Route     - /publication/delete/book
// Descripition   - to delete an book from a publication
// Access     - Public
// Method     - delete
// Parameter - id,isbn
Router.delete("/publication/delete/book/:isbn/:id", async(req,res) =>{
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

module.exports = Router;