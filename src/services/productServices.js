const slugify = require('slugify');
const ProductModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");


// @desc Get all products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const products = await ProductModel.find().skip(skip).limit(limit);
    res.status(200).json({ result: products.length, page, data: products });
});


// @desc Get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
        return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    res.status(200).json({ data: product });
});


// @desc Create new product
// @route POST /api/v1/products 
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    const product = await ProductModel.create(req.body);

    res.status(201).json({ data: product });
});


// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    req.body.slug = slugify(req.body.title);
    const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    if (!product) {
        return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    res.status(200).json({ data: product });
});

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
        return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    res.status(200).json({ message: `Product with id ${id} deleted` });
});