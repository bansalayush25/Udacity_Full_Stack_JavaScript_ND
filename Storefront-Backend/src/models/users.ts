import db from "../database";

export type User = {
    firstName: string,
    lastName: string,
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    async show(userId: number): Promise<User> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error(`Could not find user ${userId}. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await db.connect()
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [user.firstName, user.lastName, user.password])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error(`Could not add new user ${user.firstName}. Error: ${err}`)
        }
    }
}
