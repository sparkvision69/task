const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    image: { 
        type: String,
        default: null
    },
    subcategories: {
        type: [String], 
        default: []
    },
});

module.exports = mongoose.model('Category', CategorySchema);
