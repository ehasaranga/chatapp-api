import { endpoint } from "@core";
import z from "zod";

export default endpoint({
    path: ':id',
    method: 'get',
    params: z.object({
        id: z.number()
    }),
    handler: (req, res) => {

        if (!req.params.id) return res.send('Invalid Url')

        const id = req.params.id

        const user = {
            id: id,
            name: 'getting values',
        };

        res.send(user)

    }
})