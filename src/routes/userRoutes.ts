import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/grocery', userController.viewAvailableGroceryItems);
router.post('/order', userController.createOrder);

export default router;
