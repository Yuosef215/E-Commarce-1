const slugify = require('slugify');
const BrandModel = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require('../utils/apiFeatures');


// @desc Get all category
// @route GET /api/v1/brand
// @access Public
exports.getBrands = asyncHandler(async (req, res) => {
    const documentCounts = await BrandModel.countDocuments();
        const apifeatures = new ApiFeatures(BrandModel.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .search()
        .paginate(documentCounts);

    const {mongooseQuery,paginationresult} = apifeatures;
    const brands = await mongooseQuery;
    res.status(200).json({ result: brands.length, paginationresult, data: brands });
});


// @desc Get specific brand by id
// @route GET /api/v1/brand/:id
// @access Public
exports.getBrandById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await BrandModel.findById(id);
    if (!brand) {
        return next(new ApiError(`Brand with id ${id} not found`, 404));
    }
    res.status(200).json({ data: brand });
});


// @desc Create new brand
// @route POST /api/v1/brand
// @access Private
exports.createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body
    const brand = await BrandModel.create({ name, slug: slugify(name) });

    res.status(201).json({ data: brand });
});


// @desc Update brand
// @route PUT /api/v1/brand/:id
// @access Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await BrandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    if (!brand) {
        return next(new ApiError(`Brand with id ${id} not found`, 404));
    }
    res.status(200).json({ data: brand });
});

// @desc Delete brand
// @route DELETE /api/v1/brand/:id
// @access Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await BrandModel.findByIdAndDelete(id);
    if (!brand) {
        return next(new ApiError(`Brand with id ${id} not found`, 404));
    }
    res.status(200).json({ message: `Brand with id ${id} deleted` });
});