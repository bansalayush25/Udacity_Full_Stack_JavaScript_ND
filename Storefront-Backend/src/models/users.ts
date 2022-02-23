import db from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(userId: string): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${userId}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );

      const conn = await db.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash,
      ]);
      const newUser = result.rows[0];
      conn.release();
      return newUser;
    } catch (err) {
      throw new Error(
        `Could not add new user ${user.firstname}. Error: ${err}`
      );
    }
  }

  async login(user: User): Promise<User | null> {
    const conn = await db.connect();
    const sql =
      'SELECT password FROM users WHERE firstname=($1) AND lastname=($2)';

    const result = await conn.query(sql, [user.firstname, user.lastname]);

    if (result.rows.length) {
      const dbUser = result.rows[0];

      if (bcrypt.compareSync(user.password + pepper, dbUser.password)) {
        return user;
      }
    }

    return null;
  }
}
