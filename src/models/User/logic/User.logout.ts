
import { endpoint, validate } from "@core";

export const UserLogin = endpoint({
    path: '/logout',
    method: 'post',
    baseRoute: true,
    handler: async (req, res) => {

        res.clearCookie('session')

        res.status(200);

    }
})