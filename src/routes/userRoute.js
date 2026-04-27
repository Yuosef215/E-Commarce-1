const express = require('express');
const { 
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator
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

const router = express.Router();

router.put('/:id/changePassword', changeUserPassword);

router.route('/').get(getUsers)
    .post(uploadUserImage,resizeImage,createUserValidator,createUser);
router.route('/:id').get(getUserValidator, getUserbyId)
    .put(uploadUserImage,resizeImage,updateUserValidator,updateUser)
    .delete(deleteUserValidator,deleteUser);




module.exports = router;