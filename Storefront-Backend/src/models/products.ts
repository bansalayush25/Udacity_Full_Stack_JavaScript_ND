import db from "../database";

export type Product = {
    name: string,
    price: number,
    category: string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }

    async show(productId: number): Promise<Product> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [productId])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error(`Could not find product ${productId}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const conn = await db.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [product.name, product.price, product.category])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`)
        }
    }
}
