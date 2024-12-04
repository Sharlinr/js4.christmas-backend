import express from 'express';
import {
  listCartItems,
  addToCart,
  removeFromCart,
} from '../controllers/cartController.mjs';

const router = express.Router();

router.get('/', listCartItems);
router.post('/', addToCart);
router.put('/', addToCart);
router.delete('/:id', removeFromCart);

export default router;
