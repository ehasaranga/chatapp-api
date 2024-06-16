import { defineModel } from "@core";
import { DI } from "@app";
import { UserChatStatus } from "@app/models/UserChatStatus/UserChatStatus.entity";

export const Message = defineModel({
    name: 'UserChatStatus',
    entity: UserChatStatus,
    endpoints: () => [],
    repo: () => DI.orm.em.getRepository(UserChatStatus)
})