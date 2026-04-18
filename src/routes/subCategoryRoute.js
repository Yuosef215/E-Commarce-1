const express = require("express");

const {createSubCategory, getSubCategories, getSubCategoryById} = require("../services/subCategoryService");
const { createSubCategoryValidator,getSubCategoryValidator } = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router.route("/")
.post(createSubCategoryValidator, createSubCategory)
.get(getSubCategories);
router.route("/:id").get(getSubCategoryValidator, getSubCategoryById);



module.exports = router;