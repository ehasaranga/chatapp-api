import { RestError } from "@core/classes";
import { NextFunction, Response, Request } from "express";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    // console.error(err.stack);

    let status = err.status ? err.status : (res.statusCode === 200) ? 500 : res.statusCode;

    let message:unknown = null;

    let details:unknown = null;

    let name = err.name;

    let statusMsg:StatusType = 'error';

    const errRes:any = {}

    switch (err.constructor) {

        case RestError:
            status = err.status
            break;

        case TokenExpiredError:
            status = 401
            break;

        case NotBeforeError:
        case JsonWebTokenError:
            status = 403
            break;

        case ZodError:
            //flatten / format is function on ZodError
            statusMsg = 'fail';
            details  = err.flatten()!.fieldErrors
            message = 'Validation Failed'
            status = 400

        default:
            break;
    }

    // if (process.env.NODE_ENV !== 'production') errRes.type = name 
    errRes.status = statusMsg;
    errRes.message = message || err.message || 'Internal Server Error';
    errRes.errors = details || err;

    return res.status(status).json(errRes);

}

type StatusType = 'error' | 'success' | 'fail';
