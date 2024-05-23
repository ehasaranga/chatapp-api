import { endpoint, validate } from "@core";
import z from "zod";

export default endpoint({
    path: ':id',
    method: 'put',
    handler: (req, res) => {

        const params = validate(req.params, z.object({
            id: z.number()            
        }));

        console.log(params.id);

        const id = params.id

        res.send('')

    }
})