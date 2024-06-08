
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";

export const UserGetAll = endpoint({
    path: '/',
    method: 'get',
    action: 'read',
    handler: async (req, res) => {

        if (!['super', 'admin'].includes(req.user.role)) {

            res.status(401);

            throw Error('Authorization Error')

        }

        const userRoleOrder = ['super', 'admin', 'user'];

        const rolesAllowed = userRoleOrder.slice(userRoleOrder.indexOf(req.user.role))

        console.log(rolesAllowed)

        const users =  await User.repo().find({ role: rolesAllowed })

        res.status(200).json(users)

    }
})