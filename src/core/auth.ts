import { TEndpoint } from "@core/endpoint";
import { NextFunction, Request, Response } from "express";


export const auth = (modelName: string,  endpoint: TEndpoint) => (req: Request, res: Response, next: NextFunction) => {
    
    console.log(modelName,'.', endpoint.action)
    console.log(req.signedCookies)

    if (endpoint.action === false) return next();


    return res.status(401).json('Unauthorized');

}