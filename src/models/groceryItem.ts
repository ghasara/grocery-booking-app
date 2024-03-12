import pool from '../db';

class GroceryItem {
    static table = 'grocery_items';

    static findAll(callback: Function) {
        pool.query(`SELECT * FROM ${this.table}`, (error:any, results:any) => {
            if (error) throw error;
            callback(results);
        });
    }

    static create(data: { name: string; price: number; inventoryLevel: number }, callback: Function) {
        pool.query(`INSERT INTO ${this.table} SET ?`, data, (error:any, results:any) => {
            if (error) throw error;
            callback(results.insertId);
        });
    }

}

export default GroceryItem;
