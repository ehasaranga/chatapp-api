import { defineModel } from "@core";
import { UserEntity } from "./User.entity";
import { DI } from "@app";
import { UserCreate } from "@app/models/User/logic/User.create";
import { UserUpdate } from "@app/models/User/logic/User.update";
import { UserLogin } from "@app/models/User/logic/User.login";
import { UserMe } from "@app/models/User/logic/User.me";
import { UserGet } from "@app/models/User/logic/User.get";
import { UserGetAll } from "@app/models/User/logic/User.getAll";

export const User = defineModel({
    name: 'User',
    entity: UserEntity,
    repo: () => DI.orm.em.getRepository(UserEntity),
    defaultEndpoints: false,
    endpoints: () => [ 
        UserCreate, 
        UserUpdate, 
        UserLogin, 
        UserMe,
        UserGet,
        UserGetAll,
    ],
    access: {
        read: ['admin', 'user'],
        create: ['admin'],
        update: ['admin'],
        delete: ['admin'],
        me: [],
    }
})