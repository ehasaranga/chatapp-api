
import { DI } from "@app";
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";
import bcrypt from 'bcryptjs'


export const UserCreate = endpoint({
    path: '/',
    method: 'post',
    action: 'create',
    handler: async (req, res) => {

        //throw new Error('This has not setup yet..')

        const data = validate(req.body, z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            password: z.string().min(4),
            confirmPass: z.string().min(4),
            role: z.enum(['superadmin', 'admin', 'user'])
        }).superRefine((val, ctx) => {

            if (val.confirmPass !== val.password) {

                ctx.addIssue({
                    code: "custom",
                    message: "The passwords did not match",
                    path: ['confirmPass']
                })

            }

        }))

        const password = await bcrypt.hash(data.password, await bcrypt.genSalt(12))

        data.password = password

        const user = User.repo().create(data);

        await DI.em.flush();

        res.json(user)

    }
})