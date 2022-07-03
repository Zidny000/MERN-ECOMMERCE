const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength: [30,"Name cannot exceed 30 character"],
        minlength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter a valid Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[8,"Password should have more than 7 characters"],
        select:false
    },
    avtar:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt: {
        type:Date,
        default:Date.now
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,


})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
    
})

//jwt token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//Copmpare Password
userSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

//Generate Password reset Token
userSchema.methods.getResetPasswordToken =  function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() +15*60*1000;

    return resetToken;
}

module.exports = mongoose.model('User',userSchema)