
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export const UserGet = endpoint({
    path: ':id',
    method: 'get',
    action: 'read',
    handler: async (req, res) => {

        if (!['super', 'admin'].includes(req.user.role)) {

            res.status(401);

            throw Error('Authorization Error')

        }

        const params = validate(req.params, z.object({
            id: z.string()
        }));

        const data = await User.repo().findOneOrFail(params.id)

        res.status(200).json(data)

    }
})