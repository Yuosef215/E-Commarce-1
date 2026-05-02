const express = require('express');
const { getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require('../utils/validators/brandValidator');

const { getBrands,
    createBrand,
    getBrandById,
    updateBrand,
    deleteBrand 
} = require('../services/brandServices');

const AuthService = require('../services/authServices');

const router = express.Router();

router.route('/').get(getBrands)
    .post(
        AuthService.protect,
        AuthService.allowedTo("admin","manager"),
        createBrandValidator, 
        createBrand
    );
router.route('/:id').get(getBrandValidator, getBrandById)
    .put(
        AuthService.protect,
        AuthService.allowedTo("admin","manager"),
        updateBrandValidator, 
        updateBrand
    )
    .delete(
        AuthService.protect,
        AuthService.allowedTo("admin"),
        deleteBrandValidator, 
        deleteBrand
    );




module.exports = router;