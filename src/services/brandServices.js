const slugify = require('slugify');
const BrandModel = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");


// @desc Get all category
// @route GET /api/v1/brand
// @access Public
exports.getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const brands = await BrandModel.find().skip(skip).limit(limit);
    res.status(200).json({ result: brands.length, page, data: brands });
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