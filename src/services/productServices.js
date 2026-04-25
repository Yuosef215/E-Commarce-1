const ProductModel = require("../models/productModel");
const factory = require('./handlersFactory');


// @desc Get all products
// @route GET /api/v1/products
// @access Public
exports.getProducts = factory.getAll(ProductModel, 'Products');

// @desc Get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProductById = factory.getOne(ProductModel);


// @desc Create new product
// @route POST /api/v1/products 
// @access Private
exports.createProduct = factory.CreateOne(ProductModel);


// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = factory.updateOne(ProductModel);

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(ProductModel);