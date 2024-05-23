
import { DI } from "@app";
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export default endpoint({
    path: '/',
    method: 'post',
    handler: async (req, res) => {

        const body = validate(req.body, z.object({
            firstName: z.string(),
            lastName: z.string(), 
            email: z.string().email()
        }))


        const user = User.repo().create(req.body);

        await DI.em.flush();

        res.json(user)

    }
})

// (property) Response<any, Record<string, any>, number>.json: (body?: any) => Response<any, Record<string, any>, number>