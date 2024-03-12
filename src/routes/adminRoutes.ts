import { Router } from 'express';
import * as adminController from '../controllers/adminController';

const router = Router();

router.post('/grocery', adminController.addGroceryItem);
router.get('/grocery', adminController.viewGroceryItems);

export default router;
