const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
    firstName: String,
    lastName: String,
    userName:String,
    pwdAccount:Number,
    téléphone:Number,
    email:String,
    dateOfBirth:String,
    sex:String,
    
})
const admin= mongoose.model('Admin',adminSchema);

module.exports=admin;