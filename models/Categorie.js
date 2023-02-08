const mongoose =require('mongoose');
const categorieshema = mongoose.schema({
    nomCategorie: String,
    famillecategorie: String,
})
const admin= mongoose.model('Categorie',categorieshema);
module.exports=categorie;
