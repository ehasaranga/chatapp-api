import { endpoint } from "@core";
import z from "zod";

type User = {
    id: number;
    name: string
}

function get(id: any) {

    const user: User = {
        id: id,
        name: 'getting values',
    }

    return user;

}

export default endpoint({
    path: ':id/:date',
    method: 'get',
    params: z.object({
        id: z.number()
    }),
    handler: (req, res) => {

        if (!req.params.id) return res.send('Invalid Url')

        console.log(req.params);

        const id = req.params.id

        const user = get(id);

        res.send(user)

    }
})