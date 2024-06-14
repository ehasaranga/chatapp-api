import { DI } from "@app";
import { User } from "@app/models/User/User";
import { NothingHappendError, endpoint, validate } from "@core";
import z from "zod";

export const UserUpdate = endpoint({
    path: ':id',
    method: 'put',
    action: 'update',
    handler: async (req, res) => {

        //throw new Error('This has not setup yet..')

        const params = validate(req.params, z.object({
            id: z.string()            
        }));

        const data = validate(req.body, z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email()
        }).partial())

        const user = await User.repo().findOneOrFail(params.id)

        // console.log(data)

        const isUpdated = await User.repo().nativeUpdate(user.id, data);

        // console.log(isUpdated)

        await DI.em.flush();

        if (!isUpdated) throw new NothingHappendError('User didnt update', 202);

        res.json(data)

    }
})