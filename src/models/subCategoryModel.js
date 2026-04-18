const mongoose = require('mongoose');



const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: [true, 'Sub category name must be unique'],
        minlength: [2, 'Sub category name must be at least 2 characters'],
        maxlength: [32, 'Sub category name must be at most 32 characters'],
        required: [true, 'Sub category name is required']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Sub category must belong to a category']
    }
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;