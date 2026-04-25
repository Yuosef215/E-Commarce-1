const CategoryModel = require("../models/categoryModel");
const factory = require('./handlersFactory');


// @desc Get all category
// @route GET /api/v1/category
// @access Public
exports.getCategory = factory.getAll(CategoryModel);


// @desc Get specific category by id
// @route GET /api/v1/category/:id
// @access Public
exports.getCategoryById = factory.getOne(CategoryModel);


// @desc Create new category
// @route POST /api/v1/category
// @access Private
exports.createCategory = factory.CreateOne(CategoryModel);


// @desc Update category
// @route PUT /api/v1/category/:id
// @access Private
exports.updateCategory = factory.updateOne(CategoryModel);

// @desc Delete category
// @route DELETE /api/v1/category/:id
// @access Private
exports.deleteCategory = factory.deleteOne(CategoryModel);