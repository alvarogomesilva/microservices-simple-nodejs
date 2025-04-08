import { Router } from 'express';
import * as CategoryController from '../controllers/category-controller';

const router = Router();

// router.get('/', ProductController.getAllProducts);
router.get('/:id', CategoryController.getProductById);
router.post('/', CategoryController.createCategory);
// router.put('/:id', ProductController.updateProduct);
// router.delete('/:id', ProductController.deleteProduct);

export default router;