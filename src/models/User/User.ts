import { defineModel } from "@core";
import { UserEntity } from "./User.entity";
import { DI } from "@app";
import { UserCreate, UserLogin, UserMe, UserUpdate } from "@app/models/User/logic";

export const User = defineModel({
    name: 'User',
    entity: UserEntity,
    repo: () => DI.orm.em.getRepository(UserEntity),
    endpoints: () => [ UserCreate, UserUpdate, UserLogin, UserMe ],
    access: {
        read: ['admin'],
        create: ['admin'],
        update: ['admin'],
        delete: ['admin'],
        me: ['admin'],
    }
})