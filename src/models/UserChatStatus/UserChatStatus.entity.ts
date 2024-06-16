import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";
import { UserEntity } from "@app/models/User/User.entity";
import { ChatEntity, ChatTypeEnum } from "@app/models/Chats/Chat.entity";

@Entity({ tableName: 'user_chat_status' })
export class UserChatStatus extends BaseEntity {

  @ManyToOne(() => UserEntity)
  userId!: UserEntity;

  @ManyToOne(() => ChatEntity)
  chatId!: ChatEntity;

  @Property()
  lastRead!: Date;

  @Enum(() => ChatTypeEnum)
  chatType!: ChatTypeEnum;

}