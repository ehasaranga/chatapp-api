import { endpointHandler } from "@core";
import { DI } from '../../../index'

const modelLogic = (app: typeof DI) => (id: number) => {

    const user = {
        id: id,
        name: 'getting values',
    }

    return user;

}

const create = modelLogic(DI);

export default endpointHandler({
    path: '',
    method: 'post',
    handler: (req, res) => {

        if (!req.params.id) return res.send('Invalid Url')

        const id = parseInt(req.params.id)

        const user = create(id);

        res.send(user)

    }
})