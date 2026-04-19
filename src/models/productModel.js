const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
        minlength: [20, 'Too short product description']
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter product quantity']
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        trim: true,
        maxlength: [32, 'Too long product price']
    },
    priceAfterDiscount: {
        type: Number,
        trim: true,
        maxlength: [32, 'Too long product price after discount']
    },
    colors: [String],
    imageCover: {
        type: String,
        required: [false, 'Please enter product image cover']
    },
    images: [String],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please enter product category']
    },
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory'
        }
    ],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0 
    },
},
    { timestamps: true ,
    versionKey: false
    }
);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;