import express, { Request, Response } from 'express';
import verifyToken from '../middleware/verifytoken';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';

const token_secret = process.env.TOKEN_SECRET!;
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const users = await store.show(req.params.id);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };

    const result = await store.create(user);
    if (result) {
      res.json(result);
    } else {
      res.status(400);
      res.send('Failed to create user');
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };

    const u = await store.login(user);
    var token = jwt.sign({ user: u }, token_secret);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, show);
  app.post('/users', verifyToken, create);
  app.post('/users/login', login);
};

export default user_routes;
