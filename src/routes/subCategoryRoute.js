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

const router = express.Router();

router.route("/")
.post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
.get(getSubCategories);
router.route("/:id")
.get(getSubCategoryValidator, getSubCategoryById)
.put(updateSubCategoryValidator,updateSubCategory)
.delete(deleteSubCategoryValidator,deleteSubCategory);



module.exports = router;