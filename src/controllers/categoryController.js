import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc    Get all categories with products
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Get products by category name
// @route   GET /api/categories/products/:name
// @access  Public
export const getProductsByCategoryName = asyncHandler(async (req, res) => {
  const categoryName = req.params.name;
  const categories = await Category.find({ name: categoryName });

  if (categories) {
    const products = categories.flatMap(category => category.products);
    res.json(products);
  } else {
    res.status(404);
    throw new Error(`Category '${categoryName}' not found`);
  }
});

// @desc    Get categories with combined products
// @route   GET /api/categories/combined
// @access  Public
export const getCategoriesWithCombinedProducts = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  const combinedCategories = categories.reduce((acc, category) => {
    const existingCategory = acc.find((cat) => cat.name === category.name);

    if (existingCategory) {
      existingCategory.products.push(...category.products);
    } else {
      acc.push({ name: category.name, products: category.products });
    }

    return acc;
  }, []);

  res.json(combinedCategories);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Public
export const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
    products: req.body.products
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Public
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = req.body.name || category.name;
    category.products = req.body.products || category.products;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Public
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});