import { endpointHandler } from "@core";

export default endpointHandler({
    path: ':id',
    method: 'get',
    handler: (req, res) => {

        if (!req.params.id) return res.send('Invalid Url')

        const id = parseInt(req.params.id)

        const user = {
            id: id,
            name: 'getting values',
        };

        res.send(user)

    }
})