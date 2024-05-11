import { defineModel } from "@core";
import { User } from "./User.entity";
import UserCreate from "./logic/User.create";
import UserUpdate from "./logic/User.update";

export default defineModel<'User'>({
    name: 'User',
    crud: true,
    entity: User,
    endpoints: [UserCreate, UserUpdate],
})