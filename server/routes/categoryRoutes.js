const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); 
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); 
    }
});


const upload = multer({ storage: storage });

router.post('/', upload.single('image'), categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.put('/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
