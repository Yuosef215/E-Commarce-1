const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const User = require("../models/userModel");
const factory = require('./handlersFactory');
const ApiError = require('../utils/ApiError');
const asyncHandler = require("express-async-handler");
const  {uploadSingleImage}  = require('../middlewares/uploadimageMiddleware');
const bcrypt = require('bcryptjs')


exports.uploadUserImage = uploadSingleImage('profileImg');

exports.resizeImage =asyncHandler( async(req,res,next) => {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

    if (req.file) {
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality: 90})
        .toFile(`uploads/users/${filename}`);
    
        // Save image into our db
        req.body.profileImg = filename;
    }

    next();
});

exports.getUsers = factory.getAll(User);


exports.getUserbyId = factory.getOne(User);



exports.createUser = factory.CreateOne(User);



exports.updateUser = asyncHandler(async (req, res, next) => {
        
        
        const document = await User.findByIdAndUpdate(req.params.id,{
             
            name: req.body.name,
            slug:req.body.slug,
            phone:req.body.phone,
            email:req.body.email,
            profileImg:req.body.profileImg,
            role:req.body.role
        },
            { new: true });
        if (!document) {
            return next(new ApiError(`Document with id ${ req.params.id} not found`, 404));
        }
        res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    
    const document = await User.findById(req.params.id);
    
    if (!document) {
        return next(new ApiError(`Document with id ${req.params.id} not found`, 404));
    }

    document.password = await bcrypt.hash(req.body.password, 12);
    await document.save();

    res.status(200).json({ data: document });
});

exports.deleteUser = factory.deleteOne(User);