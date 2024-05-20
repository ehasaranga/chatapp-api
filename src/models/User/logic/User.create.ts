
import { DI } from "@app";
import { endpoint } from "@core";

export default endpoint({
    path: '/',
    method: 'post',
    handler: async (req, res) => {

        /* validate */

        const user = DI.modules.User.repo().create(req.body);

        await DI.em.flush();

        res.json(user)

    }
})