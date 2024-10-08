
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export const UserMe = endpoint({
    path: '/me',
    method: 'get',
    action: 'me',
    handler: async (req, res) => {

        const user = await User.repo().findOneOrFail({ email: req.user.email })

        res.status(200).json(req.user)

    }
})