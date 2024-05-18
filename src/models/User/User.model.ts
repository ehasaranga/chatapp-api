import { defineModel } from "@core";
import { User } from "./User.entity";
import UserCreate from "./logic/User.create";
import UserUpdate from "./logic/User.update";
import UserGetAll from "./logic/User.getAll";
import UserGetOne from "./logic/User.getOne";
import { DI } from "@app";
import { EntityRepository } from "@mikro-orm/mongodb";

export const UserModel = defineModel<'User', EntityRepository<User>>({
    name: 'User',
    entity: User,
    repo: DI.orm.em.getRepository(User),
    endpoints: [UserGetAll, UserGetOne, UserCreate, UserUpdate]
})