import { defineModel } from "@core";
import { DI } from "@app";
import { UserDeletedMessages } from "@app/models/UserDeleteMessages/UserDeletedMessages.entity";

export const Message = defineModel({
    name: 'UserDeletedMessages',
    entity: UserDeletedMessages,
    endpoints: () => [],
    repo: () => DI.orm.em.getRepository(UserDeletedMessages)
})