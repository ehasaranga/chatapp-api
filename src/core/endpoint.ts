import { NextFunction, Request, RequestHandler, Response } from "express";

export const endpoint = (options: TEndpointArgs):TEndpoint => {

    const path: string = options.path ? options.path : '';

    const method: typeof options.method = options.method ? options.method : 'get';

    const handler = async (req: Request, res: Response, next: NextFunction) => {

        try {

            await options.handler(req as any, res, next);

        } catch (err) {

            let errMessage = '';
            let errName = ''

            if (err instanceof Error) {

                errMessage = err.message
                errName = err.name

            }

            console.error("Error Message : " + errMessage)

            res.status(400).json({
                errors: [{

                    name: errName,
                    message: errMessage,
                    details: err

                }]
            })

        }

    }

    return {
        path: path,
        method: method,
        handler: handler
    } as const

}

export type TEndpointArgs = {
    path?: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    access?: []
    handler: THandler,
}

export type TEndpoint = Required<Pick<TEndpointArgs, 'path' | 'method' | 'handler'>>

type THandler = RequestHandler;