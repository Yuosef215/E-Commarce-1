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
    deleteBrand } = require('../services/brandServices');

const router = express.Router();

router.route('/').get(getBrands)
    .post(createBrandValidator, createBrand);
router.route('/:id').get(getBrandValidator, getBrandById)
    .put(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand);




module.exports = router;