import { Request, Response } from 'express';
import GroceryItem from '../models/groceryItem';
import Order from '../models/order';

export const viewAvailableGroceryItems = (req: Request, res: Response) => {
    GroceryItem.findAll((items: Array<any>) => {
        res.json(items.filter(item => item.inventoryLevel > 0));
    });
};

export const createOrder = (req: Request, res: Response) => {
    const { userId, items } = req.body;

    Order.create(userId, items, (result:any) => {
        if (result.orderId) {
            res.status(201).json({ message: 'Order created successfully', orderId: result.orderId });
        } else {
            res.status(500).json({ message: 'Failed to create order' });
        }
    });
};
