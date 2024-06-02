import { defineModel } from "@core";
import { UserEntity } from "./User.entity";
import { DI } from "@app";
import { UserLogin, UserUpdate } from "@app/models/User/logic";

export const User = defineModel({
    name: 'User',
    entity: UserEntity,
    repo: () => DI.orm.em.getRepository(UserEntity),
    endpoints: () => [ UserUpdate, UserLogin ]
})