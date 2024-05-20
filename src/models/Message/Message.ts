import { defineModel } from "@core";
import { MessageEntity } from "./Message.entity";
import { EntityRepository } from "@mikro-orm/mongodb";
import { DI } from "@app";

export const Message = defineModel<'Message', EntityRepository<MessageEntity>>({
    name: 'Message',
    entity: MessageEntity,
    endpoints: [],
    repo: () => DI.orm.em.getRepository(MessageEntity)
})