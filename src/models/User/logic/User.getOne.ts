import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export default endpoint({
    path: ':userID',
    method: 'get',
    handler: async (req, res) => {

        const params = validate(req.params, z.object({
            userID: z.any()
        }));
        
        const user = await User.repo().findOne({ userID: parseInt(params.userID) })

        res.send(user)

    }
})