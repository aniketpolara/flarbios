import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategoryName,
  getCategoriesWithCombinedProducts
} from '../controllers/categoryController.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(createCategory);

router.route('/combined')
  .get(getCategoriesWithCombinedProducts);

router.route('/products/:name')
  .get(getProductsByCategoryName);

router.route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;