import { NextFunction, Request, RequestHandler, Response } from "express";

export function endpoint(options: TEndpointHandler) {

    const path: string = options.path ? options.path : '';

    const method: typeof options.method = options.method ? options.method : 'get';

    const handler: THandler = async (req: Request, res: Response, next: NextFunction) => {

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
                errors: [{

                    name: errName,
                    message: errMessage,
                    detail: err

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

export type TEndpointHandler = {
    path?: string;
    method?: 'get' | 'post' | 'put' | 'patch';
    access?: []
    handler: THandler
}

type THandler = RequestHandler;