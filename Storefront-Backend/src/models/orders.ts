import db from "../database";

export type Order = {
    product_id: number,
    user_id: number,
    quantity: number,
    status: boolean
}

export class OrderStore {
    async show(userId: number): Promise<Order> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error(`Could not find orders ${userId}. Error: ${err}`)
        }
    }
}
