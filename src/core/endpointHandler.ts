import { NextFunction, Request, RequestHandler, Response } from "express";

export function endpointHandler(options: TEndpointHandler) {

    if (typeof options === 'function') {

        return {
            path: '',
            method: 'get',
            handler: options
        } as const

    }

    const path = options.path ? options.path : '';

    const method = options.method ? options.method : 'get';

    const handler = (req: Request, res: Response, next: NextFunction) => {

        try {

            options.handler(req, res, next);

        } catch (e) {

            throw Error("Error Message : " + e)

        }

    }

    return {
        path: path,
        method: method,
        handler: handler
    } as const

}

export type TEndpointHandler = THandler | {
    path?: string;
    method?: 'get' | 'post' | 'put' | 'patch';
    access?: []
    handler: THandler
}

type THandler = RequestHandler;