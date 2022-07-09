const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const cloudinary = require("cloudinary").v2


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.avatar,
  { folder:"avatars",
    width:150,
    crop:"scale"
  }, 
  function(error, result) {console.log(result)}
  );


    const { name, email, password } = req.body; 
    
    const user = await User.create({
      name,
      email,
      password,
      avtar: {
        public_id: myCloud.public_id,
        url:myCloud.secure_url ,
      },
    });

    sendToken(user,201,res);

  });

//Login user
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{

  const {email,password} = req.body;
  
  //checking if user has given password and email both
  if(!email || !password){
    return next(new ErrorHander("Please enter email and password",400))

  }
  const user = await User.findOne({email}).select("+password")


  if(!user){
    return next(new ErrorHander("Invalid email or password",401))
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHander("Wrong Password!!",401))
  }

  sendToken(user,200,res);

})

//Logout user

exports.logout = catchAsyncErrors(async (req,res,next)=>{

  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })

  res.status(200).json({
    success:true,
    message:"Logged Out"
  })
})

//Forgot Password
exports.forgetPassword = catchAsyncErrors(async (req,res,next)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHander("User not found",404))
  }

  //Get ResetPassword Token
  const resetToken = user.getResetPasswordToken()
  await user.save({validateBeforeSave:false});
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`
   
  try{

    await sendEmail({
      email:user.email,
      subject : `Ecommerce Password Recovery`,
      message
    })

    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`
    })

  }catch(error){
    user.resetPasswordToken=undefined
    user.resetPsswordExpire=undefined

    await user.save({validateBeforeSave:false})

    return next(new ErrorHander(error.message,500))
  }
  
})
//Get user details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
  // const user = await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user:req.user,
  })
})

//update password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched){
    return next(new ErrorHander("Old Password is incorrect!!",401))
  }
  
  if(req.body.newPassword != req.body.confirmPassword){
    return next(new ErrorHander("Password does not match!!",401))
  }
  user.password=req.body.newPassword;
  await user.save()
  sendToken(user,200,res)
  
})

//update profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{ 
  const newUserData = {
    name:req.body.name,
    email:req.body.email
  }


  if (req.body.avatar != 'undefined') {
    console.log(req.body)
    const user = await User.findById(req.user.id);

    const imageId = user.avtar.public_id;

    await cloudinary.uploader.destroy(imageId);

    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avtar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }



  const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })


  res.status(200).json({
    success:true
  })

  
})

//get all user(admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
  const users = await User.find()
  res.status(200).json({
    success:true,
    users,
  })
})

//get single user(admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(!user){
    return next(new ErrorHander("User does not exist",400))
  }

  res.status(200).json({
    success:true,
    user,
  })
})

//Update user role

exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  
  const user =await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })


  res.status(200).json({
    success:true
  })

  
})

//Delete User

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
 
 const user = await User.findById(req.params.id)

  if(!user){
    return next(new ErrorHander("User does not exist",400))
  }

  const imageId = user.avtar.public_id;

  await cloudinary.uploader.destroy(imageId);

  await user.remove()

  res.status(200).json({
    success:true,
    message:"User deleted successfully"
  })

  
})


