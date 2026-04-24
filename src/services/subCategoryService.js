const slugify = require('slugify');
const SubCategory = require('../models/subCategoryModel');
const asyncHandler = require("express-async-handler");
const ApiError = require('../utils/ApiError');
const ApiFeatures = require("../utils/apiFeatures");


// @desc Create new sub category
// @route POST /api/v1/subCategory
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({ name, slug: slugify(name), category });

    res.status(201).json({ data: subCategory });
});

// @desc Get all category
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const documentCounts = await SubCategory.countDocuments();
        const apifeatures = new ApiFeatures(SubCategory.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .search()
        .paginate(documentCounts);

    const {mongooseQuery,paginationresult} = apifeatures;
    const subCategories = await mongooseQuery;
    res.status(200).json({ result: subCategories.length, paginationresult, data: subCategories });
});


// @desc Get specific sub category by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
        return next(new ApiError(`Sub category with id ${id} not found`, 404));
    }
    res.status(200).json({ data: subCategory });
});