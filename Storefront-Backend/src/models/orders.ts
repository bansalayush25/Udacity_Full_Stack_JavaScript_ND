import db from '../database';

export type Order = {
  product_id: number;
  user_id: number;
  quantity: number;
  status: boolean;
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
        'INSERT INTO Orders (product_id, user_id, quantity, status) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await db.connect();
      const result = await conn.query(sql, [
        order.product_id,
        order.user_id,
        order.quantity,
        order.status,
      ]);
      const dbOrder = result.rows[0];
      conn.release();
      return dbOrder;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }
}
