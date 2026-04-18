const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


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
    check('subcategory').optional().isMongoId().withMessage('Invalid subcategory ID format'),
    check('brand').optional().isMongoId().withMessage('Invalid brand ID format'),
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

