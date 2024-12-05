import express from 'express';
import {
  listCartItems,
  addToCart,
  removeFromCart,
  //updateCartProductQuantity,
} from '../controllers/cartController.mjs';

const router = express.Router();

router.get('/', listCartItems);
router.post('/', addToCart);
//router.put('/:id', updateCartProductQuantity);
router.delete('/:id', removeFromCart);

export default router;
