import { DI } from "@app";
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import { wrap } from "@mikro-orm/core";
import z from "zod";

export default endpoint({
    path: ':id',
    method: 'put',
    handler: async (req, res) => {

        const params = validate(req.params, z.object({
            id: z.string()            
        }));

        const data = validate(req.body, z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            userID: z.number()
        }))

        const user = await User.repo().findOneOrFail(params.id)

        console.log(data)

        wrap(user).assign(data)

        await DI.em.flush();

        res.json(user)

    }
})