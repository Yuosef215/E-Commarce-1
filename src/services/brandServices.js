const BrandModel = require("../models/brandModel");
const factory = require('./handlersFactory');



// @desc Get all category
// @route GET /api/v1/brand
// @access Public
exports.getBrands = factory.getAll(BrandModel);


// @desc Get specific brand by id
// @route GET /api/v1/brand/:id
// @access Public
exports.getBrandById = factory.getOne(BrandModel);


// @desc Create new brand
// @route POST /api/v1/brand
// @access Private
exports.createBrand = factory.CreateOne(BrandModel);


// @desc Update brand
// @route PUT /api/v1/brand/:id
// @access Private
exports.updateBrand = factory.updateOne(BrandModel);

// @desc Delete brand
// @route DELETE /api/v1/brand/:id
// @access Private
exports.deleteBrand = factory.deleteOne(BrandModel);
