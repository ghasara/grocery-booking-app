"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class GroceryItem {
    static findAll(callback) {
        db_1.default.query(`SELECT * FROM ${this.table}`, (error, results) => {
            if (error)
                throw error;
            callback(results);
        });
    }
    static create(data, callback) {
        db_1.default.query(`INSERT INTO ${this.table} SET ?`, data, (error, results) => {
            if (error)
                throw error;
            callback(results.insertId);
        });
    }
}
GroceryItem.table = 'grocery_items';
exports.default = GroceryItem;
