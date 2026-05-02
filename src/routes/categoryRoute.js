const express = require('express');
const { getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require('../utils/validators/categoryValidator');

const { getCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,
    resizeImage
} = require('../services/categoryServices');

const AuthService = require('../services/authServices');



const router = express.Router();

router.route('/').get(getCategory)
    .post(
        AuthService.protect,
        AuthService.allowedTo("admin","manager"),
        uploadCategoryImage, 
        resizeImage, 
        createCategoryValidator, 
        createCategory
    );
router.route('/:id').get(getCategoryValidator, getCategoryById)
    .put(
        AuthService.protect,
        AuthService.allowedTo("admin","manager"),
        uploadCategoryImage, 
        resizeImage, 
        updateCategoryValidator, 
        updateCategory
    )
    .delete(
        AuthService.protect,
        AuthService.allowedTo("admin"),
        deleteCategoryValidator, 
        deleteCategory
    );




module.exports = router;