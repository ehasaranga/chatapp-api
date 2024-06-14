import { RestError } from "@core/classes";
import { NextFunction, Response, Request } from "express";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error(err.stack); 

    let status = err.status ? err.status : (res.statusCode === 200) ? 500 : res.statusCode; 

    const message = err.message || 'Internal Server Error'; 

    if (err instanceof RestError) status = err.status;

    if (err instanceof TokenExpiredError) status = 401;

    if (err instanceof JsonWebTokenError || err instanceof NotBeforeError) status = 403;

    return res.status(status).json({
        errors: [{
            name: err.name,
            message: message,
            details: err,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }]
    });

}
