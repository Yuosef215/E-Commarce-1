const slugify = require('slugify');
const CategoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");


// @desc Get all category
// @route GET /api/v1/category
// @access Public
exports.getCategory = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await CategoryModel.find().skip(skip).limit(limit);
    res.status(200).json({ result: categories.length, page, data: categories });
});


// @desc Get specific category by id
// @route GET /api/v1/category/:id
// @access Public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
        return next(new ApiError(`Category with id ${id} not found`, 404));
    }
    res.status(200).json({ data: category });
});


// @desc Create new category
// @route POST /api/v1/category
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    const category = await CategoryModel.create({ name, slug: slugify(name) });

    res.status(201).json({ data: category });
});


// @desc Update category
// @route PUT /api/v1/category/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    if (!category) {
        return next(new ApiError(`Category with id ${id} not found`, 404));
    }
    res.status(200).json({ data: category });
});

// @desc Delete category
// @route DELETE /api/v1/category/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
        return next(new ApiError(`Category with id ${id} not found`, 404));
    }
    res.status(200).json({ message: `Category with id ${id} deleted` });
});