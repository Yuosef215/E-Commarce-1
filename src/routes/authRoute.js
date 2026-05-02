const express = require('express');
const { 
    signupValidator,
    loginValidator
} = require('../utils/validators/authValidator');

const { 
    signup,
    login,
    forgetPassword
 } = require('../services/authServices');

const router = express.Router();


router.post('/signup',signupValidator,signup);
router.post('/login',loginValidator,login);
router.post('/forgotPassword',forgetPassword);


// router.route('/:id').get(getUserValidator, getUserbyId)
//     .put(uploadUserImage,resizeImage,updateUserValidator,updateUser)
//     .delete(deleteUserValidator,deleteUser);




module.exports = router;