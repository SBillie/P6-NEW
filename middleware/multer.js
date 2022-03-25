/* package gérant les fichiers entrants dans les requetes http */
const multer = require('multer');
const upload = multer({dest:"images/"}).single("image")  

/*configuration standard de multer : permet de gerer 
le stockage des images utilisées dans la création des sauces 
- destination : savoir ou les stocker,
- filename : pour creer le nom de l'image a stocker*/
//const storage = multer.diskStorage({
   // destination: (req, file, callback) => {
     // callback(null, 'images');
   // }