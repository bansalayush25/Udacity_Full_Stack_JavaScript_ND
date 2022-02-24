import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import verifyToken from '../middleware/verifytoken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const products = await store.show(req.params.id);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const products = await store.create(product);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyToken, create);
};

export default product_routes;
