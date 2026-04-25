const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify')

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
    body('name').custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand ID format'),
    check('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Brand name must be between 2 and 100 characters'),
    body('name').custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand ID format'),
    validatorMiddleware
];