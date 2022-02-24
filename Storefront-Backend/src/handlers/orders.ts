import express, { Request, Response } from 'express';
import { Order, OrderStore, Order_Product } from '../models/orders';
import verifyToken from '../middleware/verifytoken';

const store = new OrderStore();

const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.show(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const orders = await store.create(order);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const order_product: Order_Product = {
      order_id: req.params.id as unknown as number,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    const orders = await store.addProduct(order_product);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders/:id', verifyToken, show);
  app.post('/orders', verifyToken, create);
  app.post('/orders/:id/product', verifyToken, addProduct);
};

export default order_routes;
