const products = require("../models/productModel");

exports.AddProductController = async (req, res) => {
  console.log("📦 Inside AddProductController");

  try {
    const { name, price, sizes, category } = req.body;

    // Log request body and files
    console.log("📝 Body:", req.body);
    console.log("🖼 Uploaded Files:", req.files);

    // Collect Cloudinary image URLs
    const images = req.files.map((file) => file.path);

    // Ensure values are arrays
    // const parsedColors = Array.isArray(colors)
    //   ? colors
    //   : colors
    //   ? [colors]
    //   : [];
    const parsedSizes = Array.isArray(sizes) ? sizes : sizes ? [sizes] : [];

    // Validation
    if (
      !name ||
      !price ||
      !category ||
      // parsedColors.length === 0 ||
      parsedSizes.length === 0 ||
      images.length === 0
    ) {
      return res.status(400).json({
        message:
          "All fields (name, price, category, colors, sizes, images) are required",
      });
    }

    // Create product
    const newProduct = new products({
      name,
      price,
      image: images,
      // colors: parsedColors,
      sizes: parsedSizes,
      category,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error adding product:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get all products
exports.getAllProductController = async (req, res) => {
  console.log("inside getAllProductController");
  try {
    const productList = await products.find();
    res.status(200).json(productList);
  } catch (e) {
    res.status(401).json(e);
  }
};

// Edit product controller
exports.EditProductController = async (req, res) => {
  console.log("✏️ Inside EditProductController");

  try {
    const { id } = req.params;
    const { name, price, colors, sizes, category } = req.body;

    // Log request body and files
    console.log("📝 Body:", req.body);
    console.log("🖼 Uploaded Files:", req.files);

    // Collect Cloudinary image URLs if files are uploaded
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    // Ensure values are arrays
    const parsedColors = Array.isArray(colors)
      ? colors
      : colors
      ? [colors]
      : [];
    const parsedSizes = Array.isArray(sizes) ? sizes : sizes ? [sizes] : [];

    // Find the product
    const product = await products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (parsedColors.length > 0) product.colors = parsedColors;
    if (parsedSizes.length > 0) product.sizes = parsedSizes;
    if (images.length > 0) product.image = images;

    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.error(" Error editing product:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete product controller
exports.DeleteProductController = async (req, res) => {
  console.log(" Inside DeleteProductController");
  try {
    const { id } = req.body;
    const product = await products.findByIdAndDelete(id);
    res.status(201).json(product)

  } catch (e) {
    res.status(401).json(e);
  }
};

// get printed products limit 4
exports.getPrintedProductsController = async (req, res) => {
  console.log(" Inside getPrintedProductsController");
  try {
    const productList = await products.find({category:"printed"}).limit(4);
    res.status(200).json(productList);
  } catch (e) {
    res.status(401).json(e);
  }
};

// get solid products limit 4
exports.getSolidProductsController = async (req, res) => {
  console.log(" Inside getSolidProductsController");
  try {
    const productList = await products.find({category:"solid"}).limit(4);
    res.status(200).json(productList);
  } catch (e) {
    res.status(401).json(e);
  }
};

// get product by id
exports.getProductByIdController = async (req, res) => {
  console.log("inside getProductById Controller");
  const {id}=req.params
  try{
     const result =  await products.findById(id);
     res.status(200).json(result);
  }catch(e){
    res.status(401).json(e);
  }
  
}

