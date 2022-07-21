const Product = require("../models/productModel");
const ErrorHnader = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary").v2

//create product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {


  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    if(req.body.images != undefined){ 
      images = req.body.images;
    }
    
  }
  
  
  const imagesLinks = [];

  

  for (let i = 0; i < images.length; i++) {
    
    const myCloud = await cloudinary.uploader.upload(images[i], {
      folder: "products",
      width:200,
      crop:"scale"
    },
    function(error, result) {
      console.log(error)
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    });
    
  }

  
  if(imagesLinks.length == 0){
    req.body.images = [{ public_id: "No Images", url: "No Image URL", }]
  }else{ 
    req.body.images = imagesLinks;
  }

  
  req.body.user = req.user.id

  const product = await Product.create(req.body,function(error,result) {console.log(error)});
  console.log(product)
 
   res.status(201).json({
     success: true,
     product,
   });
 });
  
// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  // apiFeature.pagination(resultPerPage);

  // products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});


// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});



//Product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHnader("Product not found",400)) 
  }

  res.status(200).json({
    success:true,
    product
  })
})

//Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if(images !== undefined){

    for(let i=0;i<product.images.length;i++){
      const result = await cloudinary.uploader.destroy(
        product.images[i].public_id
      )
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

  }





  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });

})

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }


  for(let i=0;i<product.images.length;i++){
    const result = await cloudinary.uploader.destroy(
      product.images[i].public_id
    )
  }
  

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
})
//Create Product Review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
  
  const {rating,comment,productId} = req.body
  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }

  const  product = await Product.findById(productId)

  const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id)

  if(isReviewed){
    product.reviews.forEach(rev=>{
      if(rev.user.toString()===req.user._id.toString){
        rev.rating=rating,
        rev.comment=comment
      }
    })
  }else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({validateBeforeSave:false});
  res.status(200).json({
    success:true
  })

})
//Get all Reviews of a product
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHander("Product not found",400))
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

//Delete Review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHander("Product not found",400))
  }

  const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString())

  let avg=0;
  reviews.forEach(rev=>{
    avg=avg+rev.rating;
  })

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  
  const numOfReviews  = reviews.length;
  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
  })
})