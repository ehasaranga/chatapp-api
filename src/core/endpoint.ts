import { NextFunction, Request, RequestHandler, Response } from "express";

export function endpoint(options: TEndpointHandler) {
    
    const path = options.path ? options.path : '';

    const method = options.method ? options.method : 'get';

    const handler = async (req: Request, res: Response, next: NextFunction) => {

        try {

            await options.handler(req, res, next);

        } catch (err) {

            let errMessage = '';
            let errName = ''

            if (err instanceof Error) {

                errMessage = err.message
                errName = err.name

            } 

            console.error("Error Message : " + errMessage)

            res.status(400).json({
                message: errMessage,
                name: errName,
                data: err
            })

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