import { endpoint, validate } from "@core";
import z from "zod";

export const routes = (model: any) => {

    // console.log('test ', model)

    return [getOne(model), getAll(model), deleteOne(model)] as const

}


const getOne = (model: any) => endpoint({
    path: ':id',
    method: 'get',
    handler: async (req, res) => {

        const params = validate(req.params, z.object({
            id: z.string()
        }));

        const data = await model.repo().findOneOrFail(params.id)

        res.status(200).json(data)

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

const deleteOne = (model: any) => endpoint({
    path: ':id',
    method: 'delete',
    handler: async (req, res) => {

        const params = validate(req.params, z.object({
            id: z.string()
        }));

        await model.repo().findOneOrFail(params.id)

        const data = await model.repo().nativeDelete({ id: params.id });

        if (!data) throw new Error('Error Deleting');

        res.status(200).json({
            success: true,
            message: 'Successfully Delete'
        })

    }
})
