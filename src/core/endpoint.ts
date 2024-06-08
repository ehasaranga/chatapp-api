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

            return next(err)

            // let errMessage = '';
            // let errName = ''

            // if (err instanceof Error) {

            //     errMessage = err.message
            //     errName = err.name

            // }

            // console.error("Error Message : " + errMessage)

            // if (res.headersSent) return;

            // if (res.statusCode === 200) res.status(400);

            // res.json({
            //     errors: [{

            //         name: errName,
            //         message: errMessage,
            //         details: err

            //     }]
            // })

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

export type TActions = 'read' | 'create' | 'update' | 'delete';

export type TEndpointArgs = {
    path?: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    action?: UnionString<TActions> | boolean;
    handler: THandler;
    baseRoute?: boolean;
}

export type TEndpoint = Required<Pick<TEndpointArgs, 'path' | 'method' | 'handler' | 'baseRoute' | 'action'>>

type THandler = RequestHandler;