const SubCategory = require('../models/subCategoryModel');
const factory = require('./handlersFactory');



// @desc Create new sub category
// @route POST /api/v1/subCategory
// @access Private
exports.createSubCategory = factory.CreateOne(SubCategory);

exports.updateSubCategory = factory.updateOne(SubCategory);

exports.deleteSubCategory = factory.deleteOne(SubCategory);

// @desc Get specific sub category by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategoryById = factory.getOne(SubCategory);

// @desc Get all category
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory);
exports.createFilterObj = (req , res , next) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = {category: req.params.categoryId}
    req.filterOdj = filterObject;
    next();
};

exports.setCategoryIdToBody = (req,res,next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
};





