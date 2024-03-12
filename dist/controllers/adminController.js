"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewGroceryItems = exports.addGroceryItem = void 0;
const groceryItem_1 = __importDefault(require("../models/groceryItem"));
const addGroceryItem = (req, res) => {
    groceryItem_1.default.create(req.body, (id) => {
        res.status(201).json(Object.assign({ id }, req.body));
    });
};
exports.addGroceryItem = addGroceryItem;
const viewGroceryItems = (req, res) => {
    groceryItem_1.default.findAll((items) => {
        res.json(items);
    });
};
exports.viewGroceryItems = viewGroceryItems;
