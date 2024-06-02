
import { DI } from "@app";
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export const UserLogin = endpoint({
    path: '/login',
    method: 'post',
    handler: async (req, res) => {
        
        const data = validate(req.body, z.object({
            username: z.string(),
            password: z.string()
        }))

        // const user = User.repo().create(data);

        // await DI.em.flush();

        res.json(data)

    }
})