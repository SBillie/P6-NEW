
//importation de mongoose database
const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');
const password = process.env.DB_PASSWORD
const username = process.env.DB_USER
const nomcoll = process.env.DB_NAME
const uri =
`mongodb+srv://${username}:${password}@clusterp6.sq6wr.mongodb.net/${nomcoll}?retryWrites=true&w=majority`

//connexion à la database mongoDB
mongoose
.connect (uri)
.then (()=> console.log ("connected to mongoDB"))
.catch((err) => console.error ("not connected to mongoDB:", err))

//modèle de signup pour enregistrer un nouvel utilisateur
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

userSchema.plugin(uniqueValidator)  

const User = mongoose.model ("User", userSchema)
 
module.exports = {mongoose, User}