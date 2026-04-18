const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand ID format'),
    validatorMiddleware,
];


exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Brand name must be between 2 and 100 characters'),
    validatorMiddleware
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand ID format'),
    check('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Brand name must be between 2 and 100 characters'),
    validatorMiddleware
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand ID format'),
    validatorMiddleware
];