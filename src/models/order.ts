import pool from '../db';

interface OrderItem {
    groceryItemId: number;
    quantity: number;
}

class Order {
    static table = 'orders';

    static createOrderItems(orderId: number, items: OrderItem[], connection: any, callback: Function) {
        const values = items.map(item => [orderId, item.groceryItemId, item.quantity]);

        connection.query(`INSERT INTO order_items (orderId, groceryItemId, quantity) VALUES ?`, [values], (error:any, results:any) => {
            if (error) {
                return connection.rollback(() => {
                    connection.release();
                    callback(null, error);
                });
            }
            callback(results);
        });
    }

    static create(userId: number, items: OrderItem[], callback: Function) {
        pool.getConnection((err:any, connection:any) => {
            if (err) throw err;

            connection.beginTransaction((err:any) => {
                if (err) {
                    connection.rollback(() => {
                        connection.release();
                        callback(null, err);
                    });
                } else {
                    connection.query(`INSERT INTO ${this.table} (userId) VALUES (?)`, [userId], (error:any, orderResults:any) => {
                        if (error) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(null, error);
                            });
                        }

                        const orderId = orderResults.insertId;
                        this.createOrderItems(orderId, items, connection, (itemResults:any) => {
                            connection.commit((err:any) => {
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

export default Order;
