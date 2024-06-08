import { TDefineModel } from "@core/defineModel";
import { TEndpoint } from "@core/endpoint";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


export const auth = (model: ReturnType<TDefineModel>,  endpoint: TEndpoint) => (req: Request, res: Response, next: NextFunction) => {

    const secret = process.env.TOKEN_SECRET;

    // see if the route is public or not
    if (endpoint.action === false) return next();

    // if not check for jwt to see the roles of the user

    //cookie has been edited
    if (req.signedCookies.session === false) return res.sendStatus(403);

    //no cookie & no secret
    if (!req.signedCookies.session || !secret) return res.sendStatus(401);

    const user:any = jwt.verify(req.signedCookies.session, secret)

    //if user has super role pass 
    if (user.role == 'super') return next();

    
    //if user has required roles pass
    const access = model.access ? model.access : {}

    if (access[endpoint.action as string]?.includes(user.role)) return next()


    // console.log(model.name,'.', endpoint.action)
    // console.log(req.signedCookies.session)


    return res.status(401).json('Unauthorized');

}