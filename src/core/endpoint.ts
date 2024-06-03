import { UnionString } from "@core/util.types";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const endpoint = (options: TEndpointArgs):TEndpoint => {

    const path: string = options.path ? options.path : '';

    const method: typeof options.method = options.method ? options.method : 'get';

    const baseRoute: boolean = options.baseRoute ? options.baseRoute : false;

    const action = typeof options.action === 'undefined' ? false : options.action

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

            if (res.headersSent) return;

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
        handler: handler,
        baseRoute: baseRoute,
        action: action
    } as const

}

export type TEndpointArgs = {
    path?: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    action?: UnionString<'read' | 'create' | 'update' | 'delete'> | boolean;
    handler: THandler;
    public?: boolean;
    baseRoute?: boolean;
}

export type TEndpoint = Required<Pick<TEndpointArgs, 'path' | 'method' | 'handler' | 'baseRoute' | 'action'>>

type THandler = RequestHandler;