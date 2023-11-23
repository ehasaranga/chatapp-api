import { endpointHandler } from "@core";

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

export default endpointHandler({
    path: ':id/:date',
    method: 'get',
    handler: (req, res) => {

        if (!req.params.id) return res.send('Invalid Url')

        console.log(req.params);

        const id = parseInt(req.params.id)

        const user = get(id);

        res.send(user)

    }
})