import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export default endpoint({
    path: ':id',
    method: 'get',
    handler: async (req, res) => {

        const params = validate(req.params, z.object({
            id: z.string()
        }));

        const user = await User.repo().findOneOrFail(params.id)

        res.json(user)

    }
})