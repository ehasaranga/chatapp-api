
import { DI } from "@app";
import { endpointHandler } from "@core";

export default endpointHandler({
    path: '/',
    method: 'post',
    handler: async (req, res) => {

        /* validate */

        const user = DI.modules.User.repo().create(req.body);

        await DI.em.flush();

        res.json(user)

    }
})