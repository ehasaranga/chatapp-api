import { defineModel } from "@core";
import { UserEntity } from "./User.entity";
import UserCreate from "./logic/User.create";
import UserUpdate from "./logic/User.update";
import UserGetAll from "./logic/User.getAll";
import UserGetOne from "./logic/User.getOne";
import { DI } from "@app";
import { EntityRepository } from "@mikro-orm/mongodb";

export const User = defineModel<'User', EntityRepository<UserEntity>>({
    name: 'User',
    entity: UserEntity,
    repo: () => DI.orm.em.getRepository(UserEntity),
    endpoints: [UserGetAll, UserGetOne, UserCreate, UserUpdate]
})