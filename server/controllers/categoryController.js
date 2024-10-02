const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        subcategories: req.body.subcategories,
        image: req.file ? req.file.path : null 
    });
    await category.save();
    res.status(201).json(category);
};

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

exports.updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
};

exports.deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
};
