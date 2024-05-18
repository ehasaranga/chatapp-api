import { defineModel } from "@core";
import { User } from "./User.entity";
import UserCreate from "./logic/User.create";
import UserUpdate from "./logic/User.update";
import UserGetAll from "./logic/User.getAll";
import UserGetOne from "./logic/User.getOne";

export default defineModel<'User'>({
    name: 'User',
    crud: true,
    entity: User,
    endpoints: [UserGetAll, UserGetOne, UserCreate, UserUpdate]
})