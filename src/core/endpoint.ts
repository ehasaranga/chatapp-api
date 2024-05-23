import { NextFunction, Request, RequestHandler, Response } from "express";
import z from 'zod'

export function endpoint<TQuery, TParams, TBody>(options: TEndpointArgs<TQuery, TParams, TBody>) {

    const path: string = options.path ? options.path : '';

    const method: typeof options.method = options.method ? options.method : 'get';

    const handler = async (req: Request, res: Response, next: NextFunction) => {

        try {

            // if (options.params instanceof z.Schema) {

            //     const safeParams = options.params?.safeParse(req.params);

            // }

            // if (options.query instanceof z.Schema) {

            //     const safeQuery = options.query?.safeParse(req.query);

            // }

            // if (options.body instanceof z.Schema) {

            //     const safeBody = options.body?.safeParse(req.body);

            //     if (!safeBody?.success) throw safeBody.error

            //     req.body = safeBody.data
            // }


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

export type TEndpointArgs<TQuery, TParams, TBody> = {
    path?: string;
    method?: 'get' | 'post' | 'put' | 'patch';
    access?: []
    handler: THandler<TQuery, TParams, TBody>,
    // params?: z.Schema<TParams>,
    // query?: z.Schema<TQuery>,
    // body?: z.Schema<TBody>
}

// type THandler<TQuery, TParams, TBody> = RequestHandler<TParams, TBody | any, any, TQuery>;
type THandler<TQuery, TParams, TBody> = RequestHandler;