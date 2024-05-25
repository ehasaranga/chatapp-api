import { endpoint, validate } from "@core";
import z from "zod";

export const routes = (model: any) => {

    // console.log('test ', model)

    return [getOne(model), getAll(model)] as const

}


const getOne = (model: any) => endpoint({
    path: ':id',
    method: 'get',
    handler: async (req, res) => {

        const params = validate(req.params, z.object({
            id: z.string()
        }));

        const user = await model.repo().findOneOrFail(params.id)

        res.status(200).json(user)

    }
})

const getAll = (model: any) => endpoint({
    path: '/',
    method: 'get',
    handler: async (req, res) => {

        const data = await model.repo().findAll()

        res.status(200).json(data)

    }
})
