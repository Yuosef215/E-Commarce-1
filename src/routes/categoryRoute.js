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
    deleteCategory
 } = require('../services/categoryServices');

const router = express.Router();

router.route('/').get(getCategory)
    .post(createCategoryValidator, createCategory);
router.route('/:id').get(getCategoryValidator, getCategoryById)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);




module.exports = router;