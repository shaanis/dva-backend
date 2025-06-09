const categories = require('../models/categorymodel');

exports.AddCategoryController = async (req, res) => {
  console.log("Inside AddCategoryController");

  try {
    const { name, description ,slug} = req.body;
    const image = req.file?.path;

    // Validate input
    if (!name || !description || !image) {
      return res.status(400).json({
        message: "All fields (name, description, image) are required",
      });
    }

    // Check for existing category
    const existingCategory = await categories.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    // Create and save new category
    const newCategory = new categories({
      name,
      description,
      image,
      slug
    });

    await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });

  } catch (error) {
    console.error("Error in AddCategoryController:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get all categories
exports.GetAllCategoriesController = async (req, res) => {
  console.log("Inside GetAllCategoriesController");
    try {
        const categoriesList = await categories.find();
    
         res.status(200).json(
         categoriesList
        );
    
    } catch (error) {
        console.error("Error in GetAllCategoriesController:", error.message);
        return res.status(500).json({
        message: "Internal Server Error",
        });
    }
}

// edit category
exports.EditCategoryController = async (req, res) => {
  console.log("Inside EditCategoryController");

  try {
    const { id } = req.params;
    const { name, description, slug } = req.body;
    const image = req.file?.path;

    // Check if another category with the same name already exists
    const existingCategory = await categories.findOne({ name, _id: { $ne: id } });

    if (existingCategory) {
      return res.status(400).json({
        message: "Another category with the same name already exists",
      });
    }

    // Prepare update object
    const updateData = { name, description, slug };
    if (image) {
      updateData.image = image;
    }

    // Update the category
    const updatedCategory = await categories.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });

  } catch (error) {
    console.error("Error in EditCategoryController:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// delete category
exports.DeleteCategoryController = async (req, res) => {
  try {
    const { id } = req.query;

    const deleteCategory = await categories.findByIdAndDelete(id);

    res.status(200).json({
      message: "Category deleted successfully",
      deleteCategory,
    });
  } catch (error) {
    console.error("Error in DeleteCategoryController:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};