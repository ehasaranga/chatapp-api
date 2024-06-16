import { defineModel } from "@core";
import { DI } from "@app";
import { UserChatStatusEntity } from "@app/models/UserChatStatus/UserChatStatus.entity";

export const UserChatStatus = defineModel({
    name: 'UserChatStatus',
    entity: UserChatStatusEntity,
    endpoints: () => [],
    repo: () => DI.orm.em.getRepository(UserChatStatusEntity)
})