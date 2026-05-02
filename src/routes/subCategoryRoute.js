const express = require("express");

const {createSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody
} = require("../services/subCategoryService");
const { createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
} = require("../utils/validators/subCategoryValidator");

const AuthService = require('../services/authServices');

const router = express.Router();

router.route("/")
.post(
    AuthService.protect,
    AuthService.allowedTo("admin","manager"),
    setCategoryIdToBody,
    createSubCategoryValidator, 
    createSubCategory
)
.get(getSubCategories);
router.route("/:id")
.get(
    getSubCategoryValidator, 
    getSubCategoryById
)
.put(
    AuthService.protect,
    AuthService.allowedTo("admin","manager"),
    updateSubCategoryValidator,
    updateSubCategory
)
.delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
);



module.exports = router;