const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const CategoryModel = require("../models/categoryModel");
const factory = require('./handlersFactory');
const ApiError = require('../utils/ApiError');
const asyncHandler = require("express-async-handler");
const  {uploadSingleImage}  = require('../middlewares/uploadimageMiddleware');

// 1-  DiskStorage
// const multerStorage = multer.diskStorage({
//     destination: function (req,file,cb) {
//         cb(null, "uploads/categories");
//     },
//     filename: function (req,file,cb) {
//         const ext = file.mimetype.split("/")[1];
//         const filename = `caregory-${uuidv4()}-${Date.now()}.${ext}`;
//         cb(null, filename);
//     },
// });

// const multerStorage = multer.memoryStorage();

// const multerFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith("image")){
//         cb (null, true)
//     }else {
//         cb(new ApiError(`Only Image allowed`,400) ,false)
//     }
// }


// const upload = multer({storage: multerStorage , fileFilter:multerFilter});



exports.uploadCategoryImage = uploadSingleImage('image');

exports.resizeImage =asyncHandler( async(req,res,next) => {
    const filename = `caregory-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
    .resize(600,600)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;

    next();
});

exports.getCategory = factory.getAll(CategoryModel);

// @desc Get specific category by id
// @route GET /api/v1/category/:id
// @access Public
exports.getCategoryById = factory.getOne(CategoryModel);


// @desc Create new category
// @route POST /api/v1/category
// @access Private
exports.createCategory = factory.CreateOne(CategoryModel);


// @desc Update category
// @route PUT /api/v1/category/:id
// @access Private
exports.updateCategory = factory.updateOne(CategoryModel);

// @desc Delete category
// @route DELETE /api/v1/category/:id
// @access Private
exports.deleteCategory = factory.deleteOne(CategoryModel);