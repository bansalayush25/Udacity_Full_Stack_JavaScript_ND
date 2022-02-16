import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    // add check if it is number
    const users = store.show(req.params.userId as unknown as number)
    res.json(users)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }
        const users = store.create(user)
        res.json(users)
    }
    catch(err) {
        res.status(400)
        res.json(err)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

export default user_routes