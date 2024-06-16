import { defineModel } from "@core";
import { DI } from "@app";
import { UserDeletedChatEntity } from "@app/models/UserDeleteChats/UserDeletedChat.entity";

export const UserDeletedChat = defineModel({
    name: 'UserDeletedChat',
    entity: UserDeletedChatEntity,
    endpoints: () => [],
    repo: () => DI.orm.em.getRepository(UserDeletedChatEntity)
})