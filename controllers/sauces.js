//importation de mongoose
const { mongoose } = require("mongoose")

function getSauces (req, res) {
  console.log ("get sauce")
   //console.log ("le token est bon", decoded)
   Sauce.find({}).then(sauces => res.send(sauces))
  // res.send({message: [{sauce: "sauce1"}, {sauce:"sauce2"}] })
}

//Schéma pour la création d'une sauce
const sauceSchema = new mongoose.Schema({ 
    userId: { type: String, required: true },
    name : { type: String, required: true },
    manufacturer : { type: String, required: true },
    description : { type: String, required: true },
    mainPepper : { type: String, required: true },
    imageUrl : { type: String, required: true },
    heat : { type: Number, required: true },
    likes : { type: Number, default :0 },
    dislikes : { type: Number, default :0},
    usersLiked : [String],
    usersDisliked : [String],
  });

  const Sauce = mongoose.model("Sauce", sauceSchema)

  function createSauce (req, res) {
      const Sauce = JSON.parse(req.body.sauce)
      const {name, manufacturer,description, mainPepper} = sauce
      console.log('sauce', sauce)


      console.log({body:req.body.sauce})
      console.log({body:req.file})



    const sauce = new Sauce ({
    userId: "pouet",
    name : "pouet",
    manufacturer : "pouet",
    description : "pouet",
    mainPepper : "pouet",
    imageUrl : "pouet",
    heat : "2",
    likes : "2",
    dislikes : "2",
    usersLiked : ["pouet"],
    usersDisliked : ["pouet"],
          });
          sauce.save().then((res)=> console.log ("sauce enregistrée",res)).catch(console.error)

}


module.exports = {getSauces, createSauce}