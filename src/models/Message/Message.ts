import { defineModel } from "@core";
import { MessageEntity } from "./Message.entity";
import { DI } from "@app";

export const Message = defineModel({
    name: 'Message',
    entity: MessageEntity,
    endpoints: [],
    repo: () => DI.orm.em.getRepository(MessageEntity)
})