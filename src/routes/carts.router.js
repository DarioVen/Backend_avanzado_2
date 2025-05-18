import { Router } from 'express';
import { isUser } from '../middlewares/auth.middleware.js';
import { CartController } from '../controllers/cart.controller.js';

const router = Router();
const cartController = new CartController();

router.post('/:cid/purchase', isUser, (req, res) => cartController.purchase(req, res));

export default router;