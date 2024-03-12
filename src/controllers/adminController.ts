import { Request, Response } from 'express';
import GroceryItem from '../models/groceryItem';

export const addGroceryItem = (req: Request, res: Response) => {
    GroceryItem.create(req.body, (id: number) => {
        res.status(201).json({ id, ...req.body });
    });
};

export const viewGroceryItems = (req: Request, res: Response) => {
    GroceryItem.findAll((items: Array<any>) => {
        res.json(items);
    });
};
