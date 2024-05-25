import { defineModel } from "@core";
import { UserEntity } from "./User.entity";
import UserCreate from "./logic/User.create";
import UserUpdate from "./logic/User.update";
import { DI } from "@app";

export const User = defineModel({
    name: 'User',
    entity: UserEntity,
    repo: () => DI.orm.em.getRepository(UserEntity),
    endpoints: () => [UserCreate, UserUpdate]
})