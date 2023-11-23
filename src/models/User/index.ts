import { defineModel } from "@core";
import { User } from "./UserEntity";
import UserCreate from "./logic/User.create";

export default defineModel<'User'>({
    name: 'User',
    crud: true,
    entity: User,
    endpoints: [UserCreate],
})