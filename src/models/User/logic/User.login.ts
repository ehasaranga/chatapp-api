
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import ms from "ms";

export const UserLogin = endpoint({
    path: '/login',
    method: 'post',
    baseRoute: true,
    handler: async (req, res) => {

        if (!process.env.TOKEN_SECRET)  throw Error('Setup Token Secret');
        if (!process.env.REFRESH_SECRET)  throw Error('Setup Refresh Secret');

        const TOKEN_SECRET = process.env.TOKEN_SECRET;
        const REFRESH_SECRET = process.env.REFRESH_SECRET;
        
        const data = validate(req.body, z.object({
            email: z.string(),
            password: z.string(),
            remember: z.boolean().default(false)
        }))

        const user = await User.repo().findOneOrFail({ email: data.email });

        if (!(bcrypt.compareSync(data.password, user.password))) return res.status(401).json('Authentication Error') 

        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email, 
            role: user.role,
        }

        // access token 
        const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn:  60 * 15 })
        
        const tokenSplit = token.split(".")

        const tokenPayload = tokenSplit[0] + "." + tokenSplit[1];
        const tokenSig = tokenSplit[2];


        // refresh token
        if (data.remember) {

            const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn:  '15m' })

            res.cookie('refresh', refreshToken, {
                httpOnly: true,
                maxAge: ms('30 days')
            })

        }

        res.status(200)
            .cookie('session', tokenSig, {
                httpOnly: true,
                maxAge: ms('15m')
            })
            .cookie('user', tokenPayload, {
                maxAge: ms('15m')
            })
            .json(payload)

    }
})