const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const productData = {
            title: req.body.title,
            image: req.file.path, 
            price: req.body.price,
            categories: req.body.categories.split(','), 
            subcategories: req.body.subcategories.split(','),
        };

        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updateData = { ...req.body }; 
        if (req.file) {
            updateData.image = req.file.path; 
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Updated product:', product);

        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
