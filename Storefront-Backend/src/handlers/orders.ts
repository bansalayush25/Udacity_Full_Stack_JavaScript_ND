import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/orders";

const store = new OrderStore()

const show = async (req: Request, res: Response) => {
    // add check if it is number
    const orders = store.show(req.params.userId as unknown as number)
    res.json(orders)
}

const user_routes = (app: express.Application) => {
    app.get('/orders/:id', show)
}

export default user_routes