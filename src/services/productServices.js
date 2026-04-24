const slugify = require('slugify');
const ProductModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");


// @desc Get all products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {

    // 1) Filtering
    const queryStringObject = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'keyword'];
    excludedFields.forEach((field) => delete queryStringObject[field]);

    // Applying filtering for gte, gt, lt, lte
    let queryStr = JSON.stringify(queryStringObject);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

    // 2) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 50;
    const skip = (page - 1) * limit;

    // Build query
    let mongooseQuery =  ProductModel.find(JSON.parse(queryStr))
    .skip(skip).limit(limit).populate({ path: 'category', select: 'name' });

    // 3) Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        mongooseQuery = mongooseQuery.sort(sortBy);
    }else{
         mongooseQuery = mongooseQuery.sort('-createdAt');
    }

    // 4) Limiting fields
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        mongooseQuery = mongooseQuery.select(fields);
    }else{
        mongooseQuery = mongooseQuery.select('-__v');
    };

    // 5) serch
    if (req.query.keyword) {
       const query = {};
       query.$or = [
        {title: {$regex: req.query.keyword, $options: 'i'}},
        {description: {$regex: req.query.keyword, $options: 'i'}}
       ];
         mongooseQuery = mongooseQuery.find(query);
    }

    // Execute query
    const products = await mongooseQuery;
    res.status(200).json({ result: products.length, page, data: products });
});


// @desc Get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id).populate({ path: 'category', select: 'name -_id' });
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