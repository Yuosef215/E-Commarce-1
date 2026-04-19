const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category required"],
        unique: [true, " Category must br unique"],
        minlength: [3, "To short category name"],
        maxlength: [32, "To long category name"]
    },
    slug: {
        type: String,
        lowercase: true,

    },

},{timestamps: true,
    versionKey: false
});


const CategoryModel = mongoose.model('Category', categorySchema);


module.exports = CategoryModel;