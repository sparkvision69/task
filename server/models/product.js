const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    categories: { type: [String], required: true },
    subcategories: { type: [String], required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
