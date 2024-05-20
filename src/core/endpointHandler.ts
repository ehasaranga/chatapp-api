import { NextFunction, Request, RequestHandler, Response } from "express";

export function endpointHandler(options: TEndpointHandler) {
    
    const path = options.path ? options.path : '';

    const method = options.method ? options.method : 'get';

    const handler = async (req: Request, res: Response, next: NextFunction) => {

        try {

            await options.handler(req, res, next);

        } catch (err) {

            console.error("Error Message : " + err)

            res.json(err)

        }

    }

    return {
        path: path,
        method: method,
        handler: handler
    } as const

}

export type TEndpointHandler = {
    path?: string;
    method?: 'get' | 'post' | 'put' | 'patch';
    access?: []
    handler: THandler
}

type THandler = RequestHandler;