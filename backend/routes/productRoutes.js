import express from 'express';
import { 
  createProduct, 
  getUserProducts,
  deleteProduct 
} from '../controllers/productController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(auth);

router.post('/', createProduct);
router.get('/', getUserProducts);
router.delete('/:id', deleteProduct);

export default router;