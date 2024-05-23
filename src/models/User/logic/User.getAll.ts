import { User } from "@app/models/User/User";
import { endpoint } from "@core";

export default endpoint({
    path: '/',
    method: 'get',
    handler: async (req, res) => {

        const data = await User.repo().findAll()

        res.json(data)

    }
})