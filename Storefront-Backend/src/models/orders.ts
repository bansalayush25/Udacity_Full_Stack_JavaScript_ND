import db from '../database';

export type Order = {
  user_id: number;
  status: boolean;
};

export type Order_Product = {
  product_id: number;
  order_id: number;
  quantity: number;
};

export class OrderStore {
  async show(userId: string): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders ${userId}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn = await db.connect();
      const result = await conn.query(sql, [order.user_id, order.status]);
      const dbOrder = result.rows[0];
      conn.release();
      return dbOrder;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async addProduct(order_product: Order_Product) {
    try {
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const conn = await db.connect();
      const result = await conn.query(sql, [
        order_product.order_id,
        order_product.product_id,
        order_product.quantity,
      ]);
      const dbOrderProduct = result.rows[0];
      conn.release();
      return dbOrderProduct;
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`);
    }
  }
}
