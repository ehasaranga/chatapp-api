
import { DI } from "@app";
import { User } from "@app/models/User/User";
import { endpoint } from "@core";
import z from "zod";

export default endpoint({
    path: '/',
    method: 'post',
    body: z.object({
        firstname: z.string(),
        lastname: z.string(), 
        email: z.string().email()
    }),
    handler: async (req, res) => {

        /* validate */

        console.log(req.body.id)

        const user = User.repo().create(req.body);

        await DI.em.flush();

        res.json(user)

    }
})

// (property) Response<any, Record<string, any>, number>.json: (body?: any) => Response<any, Record<string, any>, number>