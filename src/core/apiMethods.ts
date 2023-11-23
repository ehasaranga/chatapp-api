import { Request, Response } from "express";

export function apiGet ({ path = '' }, callback: (...args:any) => any) {

    return (req: Request, res: Response) => callback(req.body)

}
