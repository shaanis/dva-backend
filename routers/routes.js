const express = require('express');

const multerMidleware = require('../middlewares/multerMidleware');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMidleware');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
// admin login
router.post('/login', userController.loginAdminController);

// Add product
router.post('/addproduct',jwtMiddleware, multerMidleware.array('image', 10),  productController.AddProductController);

//  Edit product
router.put('/editproduct/:id', jwtMiddleware, multerMidleware.array('images', 10), productController.EditProductController);

// Get all products
router.get('/getallproducts', productController.getAllProductController);

// Delete product
router.delete('/deleteproduct', productController.DeleteProductController);

// get printed products
router.get('/printed-products', productController.getPrintedProductsController);

// get solid products
router.get('/solid-products', productController.getSolidProductsController);

// get  product by id
router.get('/product-detail/:id', productController.getProductByIdController);

// add category
router.post('/addcategory', jwtMiddleware, multerMidleware.single('image'), categoryController.AddCategoryController);

// get all categories
router.get('/getallcategories', categoryController.GetAllCategoriesController);

// edit category
router.put('/editcategory/:id', jwtMiddleware, multerMidleware.single('image'), categoryController.EditCategoryController);

// delete category
router.delete('/deletecategory', categoryController.DeleteCategoryController);


module.exports = router;