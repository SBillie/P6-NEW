const User = require ("../mongoDB").User
const bcrypt = require ("bcrypt")

/* protéger les routes sélectionnées et vérifier que l'utilisateur est authentifié 
avant d'autoriser l'envoi de ses requêtes.*/

const jwt = require('jsonwebtoken');



async function createUser (req,res) {
    const {email, password} = req.body
    
    const hashedPassword = await hashPassword (password)

    const user = new User ({ email, password: hashedPassword})
        
user
        .save()
        .then(() => res.status(201).send ({message:"user registered!"}))    
        .catch ((err) => res.status(400).send ({message:"User registration failed" + err})
           
)}

function hashPassword (password) {
    const saltRounds = 10;
    return bcrypt.hash (password, saltRounds)
}

async function logUser (req, res) {
    try{


    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email:email})

    const isPasswordOK = await bcrypt.compare(password, user.password)
    
    if (!isPasswordOK) {
        res.status(400).send({message:"incorrect password try again"})
    }
   
    const token = createToken (email)
    res.status(200).send({userId: user?._id, token: token})
    } catch (err) {
        console.error (err)
        res.status (500).send ({message: "Intern error"})
    }}

function createToken (email) {
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({email:email}, jwtPassword, {expiresIn:"24h"})

}

module.exports = {createUser, logUser}