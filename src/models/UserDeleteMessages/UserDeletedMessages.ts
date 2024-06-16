import { defineModel } from "@core";
import { DI } from "@app";
import { UserDeletedMessagesEntity } from "@app/models/UserDeleteMessages/UserDeletedMessages.entity";

export const UserDeletedMessage = defineModel({
    name: 'UserDeletedMessage',
    entity: UserDeletedMessagesEntity,
    endpoints: () => [],
    repo: () => DI.orm.em.getRepository(UserDeletedMessagesEntity)
})