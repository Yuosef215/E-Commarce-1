const express = require('express');
const { getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utils/validators/productValidator');

const { getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct } = require('../services/productServices');

const router = express.Router();

router.route('/').get(getProducts)
    .post(createProductValidator, createProduct);
router.route('/:id').get(getProductValidator, getProductById)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);




module.exports = router;