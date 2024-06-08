
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export const UserGetAll = endpoint({
    path: '/',
    method: 'get',
    action: 'read',
    handler: async (req, res) => {

        const userRoleOrder = ['super', 'admin', 'user'];

        const rolesAllowed = userRoleOrder.slice(userRoleOrder.indexOf(req.user.role))

        const users =  await User.repo().find({ role: rolesAllowed })

        res.status(200).json(users)

    }
})