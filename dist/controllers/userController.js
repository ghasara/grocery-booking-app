"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.viewAvailableGroceryItems = void 0;
const groceryItem_1 = __importDefault(require("../models/groceryItem"));
const order_1 = __importDefault(require("../models/order"));
const viewAvailableGroceryItems = (req, res) => {
    groceryItem_1.default.findAll((items) => {
        res.json(items.filter(item => item.inventoryLevel > 0));
    });
};
exports.viewAvailableGroceryItems = viewAvailableGroceryItems;
const createOrder = (req, res) => {
    const { userId, items } = req.body;
    order_1.default.create(userId, items, (result) => {
        if (result.orderId) {
            res.status(201).json({ message: 'Order created successfully', orderId: result.orderId });
        }
        else {
            res.status(500).json({ message: 'Failed to create order' });
        }
    });
};
exports.createOrder = createOrder;
