import { defineModel } from "@core";
import { DI } from "@app";
import { ChatEntity } from "@app/models/Chats/Chat.entity";

export const Chat = defineModel({
    name: 'Chat',
    entity: ChatEntity,
    endpoints: () => [],
    repo: () => DI.orm.em.getRepository(ChatEntity)
})