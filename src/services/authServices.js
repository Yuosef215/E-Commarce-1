const crypto = require('crypto');
const asyucHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const User = require('../models/userModel');

const createToken = (payload) => {
    return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
}


exports.signup = asyucHandler(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    const token = createToken(user._id);

    res.status(201).json({ data: user, token });
});


exports.login = asyucHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await User.findOne({ email: req.body.email });
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return next(new ApiError("Incorrect email or password"))
    };
    // 3) generate token
    const token = createToken(user._id);
    // 4) send response to client side
    res.status(200).json({ data: user, token });
});

exports.protect = asyucHandler(async (req, res, next) => {
    // 1) check if token exsit, if exsit get it 
    // if(req.headers)
    let token;
    if (req.headers.authorization &&
        req.headers.authorization
    ) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return next(new ApiError("You are not login, please login to get access this route", 401))
    };
    // 2) verify token (vo change happens , expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) check if user exsits 
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
        return next(new ApiError("The user that belong to this token dose no longer exsit", 401))
    }
    // 4) check if user change his password after token created
    if (currentUser.passwordChangedAt) {
        const passwordChangedTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000,
            10
        );
        if (passwordChangedTimestamp > decoded.iat) {
            return next(new ApiError('User recently change password please login again', 401))
        }
    };
    req.user = currentUser;
    next();
});


exports.allowedTo = (...roles) =>
     asyucHandler(async (req, res , next) => {
         // 1) access roles
         // 2) access registred user
        if(!roles.includes(req.user.role)) {
            return next(new ApiError("You are not allowed to access this route",403))
        };
        next();
        // 3)
});



exports.forgetPassword = asyucHandler(async (req, res, next) => {
    // 1) get user by  email
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return next(new ApiError(`There is no user with that email ${req.body.email}, 404`))
    }
    // 2) if user exsit, Genrate random 6 digits and it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex')
    
    user.passwordResetCode = hashedResetCode;
    user.passwordExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;

    await user.save();
    const message = `Hi ${user.name},\n We recived a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter  this code to complete the reset. \n Thanks for helping us keep your account secure. \n The E-shop Team.`
    // 3) send the  reset code via email
    try {
        await sendEmail({
        email: user.email, 
        subject: 'Your password reset code (valide for 10 min)',
        message,
    });
    } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordExpires = undefined;
        user.passwordResetVerified = undefined;
        await user.save();
        return next(new ApiError("There is an error in sendeing email", 500));
    };
    res.status(200).json({status: "Success ", message: "Reset Code send to email"})
});




