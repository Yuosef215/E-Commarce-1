const express = require('express');
const { 
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator
} = require('../utils/validators/userValidator');

const { 
    getUsers,
    createUser,
    getUserbyId,
    updateUser,
    deleteUser,
    resizeImage,
    uploadUserImage,
    changeUserPassword
 } = require('../services/userSevices');

const AuthService = require('../services/authServices');

const router = express.Router();

router.put('/:id/changePassword',changeUserPasswordValidator, changeUserPassword);

router.route('/')
    .get(
        AuthService.protect,
        AuthService.allowedTo("admin","manager"),
        getUsers
    )
    .post(
        AuthService.protect,
        AuthService.allowedTo("admin"),
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser
    );
router.route('/:id')
    .get(
        AuthService.protect,
        AuthService.allowedTo("admin"),
        getUserValidator, 
        getUserbyId
    )
    .put(AuthService.protect,
        AuthService.allowedTo("admin"),
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser
    )
    .delete(
        AuthService.protect,
        AuthService.allowedTo("admin"),
        deleteUserValidator,
        deleteUser
    );




module.exports = router;