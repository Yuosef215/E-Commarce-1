const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');
const User = require('../../models/userModel');

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    validatorMiddleware,
];


exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User name is required')
        .isLength({ min: 2 })
        .withMessage('User name must be between 2 and 100 characters'),
    body('name').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    //  Email
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) => User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error('email Alredy in user'))
            }
        })),
    // Password
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at leadt 6 characters')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('password Confirmation incorrect')
            }
            return true;
        }),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confilmation required'),
    // Images
    check('profilImg')
        .optional(),
    // Role
    check('role')
        .optional(),
    // Phone
    check('phone')
        .optional()
        .isMobilePhone(["ar-EG", "ar-SA"])
        .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),
    validatorMiddleware
];

exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    check('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('User name must be between 2 and 100 characters'),
    body('name').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    validatorMiddleware
];