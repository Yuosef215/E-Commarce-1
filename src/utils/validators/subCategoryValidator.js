const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');




exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Sub category name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Sub category name must be between 2 and 100 characters'),
        check('category')
        .notEmpty()
        .withMessage('Category ID is required')
        .isMongoId()
        .withMessage('Invalid category ID format'),
    validatorMiddleware
];

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid sub category ID format'),
    validatorMiddleware
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid sub category ID format'),
    check('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Sub category name must be between 2 and 100 characters'),
    check('category')
        .optional()
        .isMongoId()
        .withMessage('Invalid category ID format'),
    validatorMiddleware
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid sub category ID format'),
    validatorMiddleware
];