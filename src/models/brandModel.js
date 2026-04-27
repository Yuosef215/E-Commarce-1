const mongoose = require('mongoose');


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Brand required"],
        unique: [true, " Brand must be unique"],
        minlength: [3, "To short brand name"],
        maxlength: [32, "To long brand name"]
    },
    slug: {
        type: String,
        lowercase: true,

    },
    image: {
        type: String,
    }
    

},{
    timestamps: true,
    versionKey: false
});


const BrandModel = mongoose.model('Brand', brandSchema);


module.exports = BrandModel;