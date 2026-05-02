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
    deleteProduct
} = require('../services/productServices');

const AuthService = require('../services/authServices');

const router = express.Router();

router.route('/').get(getProducts)
    .post(
        AuthService.protect,
        AuthService.allowedTo("admin","manager"),
        createProductValidator, 
        createProduct
    );
router.route('/:id').get(getProductValidator, getProductById)
    .put(
        AuthService.protect,
        AuthService.allowedTo("admin","manager"),
        updateProductValidator, 
        updateProduct
    )
    .delete(
        AuthService.protect,
        AuthService.allowedTo("admin"),
        deleteProductValidator, 
        deleteProduct
    );




module.exports = router;