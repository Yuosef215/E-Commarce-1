const { check , body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify =require('slugify');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,
];


exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Category name must be between 2 and 100 characters'),
    body('name').custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    check('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Category name must be between 2 and 100 characters'),
    body('name').custom((val, {req}) => {
                req.body.slug = slugify(val);
                return true;
            }),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware
];