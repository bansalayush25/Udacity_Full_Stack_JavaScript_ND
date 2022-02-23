import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import verifyToken from '../middleware/verifytoken';

const store = new OrderStore();

const show = async (req: Request, res: Response) => {
  const orders = await store.show(req.body.userId);
  res.json(orders);
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    status: req.body.status,
  };
  const orders = await store.create(order);
  res.json(orders);
};

const order_routes = (app: express.Application) => {
  app.get('/orders/:id', verifyToken, show);
  app.post('/orders', verifyToken, create);
};

export default order_routes;
