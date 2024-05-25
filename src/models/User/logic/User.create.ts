
import { DI } from "@app";
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export default endpoint({
    path: '/',
    method: 'post',
    handler: async (req, res) => {

        //throw new Error('This has not setup yet..')
        
        const data = validate(req.body, z.object({
            firstName: z.string(),
            lastName: z.string(), 
            email: z.string().email(),
            userID: z.number()
        }))

        const user = User.repo().create(data);

        await DI.em.flush();

        res.json(user)

    }
})

// (property) Response<any, Record<string, any>, number>.json: (body?: any) => Response<any, Record<string, any>, number>