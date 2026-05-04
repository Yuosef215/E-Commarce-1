const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const User = require("../models/userModel");
const factory = require('./handlersFactory');
const ApiError = require('../utils/ApiError');
const asyncHandler = require("express-async-handler");
const  {uploadSingleImage}  = require('../middlewares/uploadimageMiddleware');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');


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
        };
        document.password = req.body.password;
    document.passwordChangedAt = Date.now();
    
    
    await document.save();

    res.status(200).json({ data: document });
});

exports.deleteUser = factory.deleteOne(User);


exports.getLoggedUserData = asyncHandler(async (req,res,next) => {
    req.params.id = req.user._id;
    next();
});


exports.updateLoggedUserPassword = asyncHandler(async (req,res,next) => {
    // 1) UPDATE USER DOCUMENT
    const user = await User.findByIdAndUpdate(req.user._id
        ,{password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now()
    },
    {new: true}
    );
    // 2) GENARATE TOKEN
    const token = createToken(user._id);
    res.status(200).json({status: "Success", token, data: user}); 
});

exports.updateLoggedUserData = asyncHandler(async (req,res,next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        profileImg: req.body.profileImg,
    }, {new: true});
    res.status(200).json({status: "Success", data: updatedUser});
});