//gestion des variables d'environnement
require ('dotenv').config()

//vérifier le fonctionnement du server
const port = 3000

//connexion to database
const mongoose = require("./mongoDB")

//controllers
const {createUser, logUser} = require("./controllers/users")
const {getSauces, createSauce} = require ("./controllers/sauces")

//importer express
const express = require('express')
const app = express()


//middleware 
const {authUser} = require ("./middleware/auth")
//package gérant les fichiers entrants dans les requetes http
const multer = require('multer');
const upload = multer().single("image") 


//CORS
//CORS Cross Origin Resource Sharing : systeme de sécurité qui empêche les requetes malveillantes
//ces headers permettent d'accéder au serveur depuis n'importe quelle origine + d'envoyer des requêtes avec les methodes GET, POST...
const cors = require ("cors")
const res = require('express/lib/response')
app.use (cors())

//
app.use(express.json())

 //routes
 app.post ("/api/auth/signup", createUser)
 app.post("/api/auth/login", logUser) 
 app.get("/api/sauces", authUser, getSauces)
 app.post("/api/sauces", authUser, upload, createSauce)
 app.get ('/', (req, res) => res.send("hello tout le monde"))

//listen
 app.listen(port, () => console.log ("listening on port"+ port))



