"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class Order {
    static createOrderItems(orderId, items, connection, callback) {
        const values = items.map(item => [orderId, item.groceryItemId, item.quantity]);
        connection.query(`INSERT INTO order_items (orderId, groceryItemId, quantity) VALUES ?`, [values], (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    connection.release();
                    callback(null, error);
                });
            }
            callback(results);
        });
    }
    static create(userId, items, callback) {
        db_1.default.getConnection((err, connection) => {
            if (err)
                throw err;
            connection.beginTransaction((err) => {
                if (err) {
                    connection.rollback(() => {
                        connection.release();
                        callback(null, err);
                    });
                }
                else {
                    connection.query(`INSERT INTO ${this.table} (userId) VALUES (?)`, [userId], (error, orderResults) => {
                        if (error) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(null, error);
                            });
                        }
                        const orderId = orderResults.insertId;
                        this.createOrderItems(orderId, items, connection, (itemResults) => {
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(null, err);
                                    });
                                }
                                connection.release();
                                callback({ orderId, itemResults });
                            });
                        });
                    });
                }
            });
        });
    }
}
Order.table = 'orders';
exports.default = Order;
