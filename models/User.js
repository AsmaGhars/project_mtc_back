const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    telephone: Number,
    email: String,
    dateOfBirth: String,
    gender: String,
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
            default: '../assets/default.jpg'
        },
    },
    role: {
        type: String,
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

   resetPasswordToken: String,
   resetPasswordExpire: Date
});
//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    //10 is the sort value
    this.password = await bcrypt.hash(this.password, 10);
})

//compare user Password
userSchema.methods.comparePassword=async function(entredPassword){
    
    return await bcrypt.compare(entredPassword, this.password); 
}

//return JWT token
userSchema.methods.getJwtToken= function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
// Generate password reset token 
userSchema.methods.getResetPasswordToken = function (){
    //generate token 
     const resetToken=crypto.randomBytes(20).toString('hex');
    //hash and reset password token
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');

    //set token expire time 
    this.expirePasswordTime= Date.now()+15*60*1000
    return resetToken
}
const user = mongoose.model('User', userSchema);
module.exports = user;