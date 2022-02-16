import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products";

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    // add check if it is number
    const products = store.show(req.params.userId as unknown as number)
    res.json(products)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }
        const products = store.create(product)
        res.json(products)
    }
    catch(err) {
        res.status(400)
        res.json(err)
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default product_routes