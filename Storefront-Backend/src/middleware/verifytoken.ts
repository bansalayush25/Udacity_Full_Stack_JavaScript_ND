import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const token_secret = process.env.TOKEN_SECRET!;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // const authorizationHeader = req.headers.authorization || ''
    const token = req.headers.authorization as string;
    jwt.verify(token, token_secret);
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

export default verifyToken;
