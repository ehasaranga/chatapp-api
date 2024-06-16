import { defineModel } from "@core";
import { DI } from "@app";
import { UserDeletedChat } from "@app/models/UserDeleteChats/UserDeletedChat.entity";

export const Message = defineModel({
    name: 'UserDeletedChat',
    entity: UserDeletedChat,
    endpoints: () => [],
    repo: () => DI.orm.em.getRepository(UserDeletedChat)
})