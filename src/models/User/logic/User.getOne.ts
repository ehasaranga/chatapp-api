import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export default endpoint({
    path: ':id',
    method: 'get',
    handler: (req, res) => {

        const params = validate(req.params, z.object({
            userID: z.number()  
        }));

        const id = params.userID

        User.repo().findOne(params)

        const user = {
            id: id,
            name: 'getting values',
        };

        res.send(user)

    }
})