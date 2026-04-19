const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const CategoryModel = require('../../models/categoryModel');
const BrandModel = require('../../models/brandModel');


exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid product ID format'),
    validatorMiddleware,
];

exports.createProductValidator = [
    check('title')
    .isLength({min: 3})
    .withMessage('must be at least 3 characters')
    .notEmpty()
    .withMessage('title is required'),
    check('description')
    .notEmpty()
    .withMessage('description is required')
    .isLength({max: 2000})
    .withMessage('Too long description'),
    check('quantity')
    .notEmpty()
    .withMessage('product quantity is required')
    .isNumeric()
    .withMessage('product quantity must be a number'),
    check('sold')
    .optional()
    .isNumeric()
    .withMessage('sold must be a number'),
    check('price')
    .notEmpty()
    .withMessage('product price is required')
    .isNumeric()
    .withMessage('product price must be a number')
    .isLength({max: 32})
    .withMessage('Too long price'),
    check('priceAfterDiscount')
    .optional()
    .isFloat()
    .isNumeric()
    .custom((value, {req}) => {
        if (req.body.price <= value) {
            throw new Error('priceAfterDiscount must be less than price');
        }
        return true;
    }),
    check('colors')
    .optional()
    .isArray()
    .withMessage('availableColors must be an array'),
    check('imagescover')
    .optional()
    .isArray()
    .withMessage('imagescover must be an array'),
    check('images')
    .optional()
    .notEmpty()
    .withMessage('product images are required')
    .isMongoId()
    .withMessage('Invalid image ID format'),
    check('subcategories').custom((value) => {
        if (!value) return Promise.resolve();
        return CategoryModel.findById(value).then(subcategory => {
            if (!subcategory) {
                return Promise.reject(new Error(`No subcategory for this id ${value}`));
            }
        });
    }).optional().isMongoId().withMessage('Invalid subcategory ID format'),
    check('brand').custom((value) => {
        if (!value) return Promise.resolve();
        return BrandModel.findById(value).then(brand => {
            if (!brand) {
                return Promise.reject(new Error(`No brand for this id ${value}`));
            }
        });
    }).optional().isMongoId().withMessage('Invalid brand ID format'),
    check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({min: 1})
    .withMessage('ratingsAverage must be at least 1.0')
    .isLength({max: 5})
    .withMessage('ratingsAverage must be at most 5.0'),
    check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),
    check('category')
    .custom((value) => {
        return CategoryModel.findById(value).then(category => {
            if (!category) {
                return Promise.reject(new Error(`No category for this id ${value}`));
            }
        });
    })
    .notEmpty()
    .withMessage('product category is required')
    .isMongoId()
    .withMessage('Invalid category ID format').custom((category => CategoryModel.findById(category).then(category => {
        if (!category) {
            return Promise.reject(new Error(`No category for this id ${category}`));
        }
    }))),
    validatorMiddleware,
];


exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid product ID format'),
    validatorMiddleware,
];

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid product ID format'),
    validatorMiddleware,
];


exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid product ID format'),
    validatorMiddleware,
];

