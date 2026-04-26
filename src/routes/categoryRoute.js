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



const router = express.Router();

router.route('/').get(getCategory)
    .post(uploadCategoryImage, resizeImage, createCategoryValidator, createCategory);
router.route('/:id').get(getCategoryValidator, getCategoryById)
    .put(uploadCategoryImage, resizeImage, updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);




module.exports = router;