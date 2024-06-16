import { Entity, Enum, ManyToOne, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";
import { UserEntity } from "@app/models/User/User.entity";
import { ChatEntity, ChatTypeEnum } from "@app/models/Chats/Chat.entity";

@Entity({ tableName: 'user_chat_status' })
export class UserChatStatusEntity extends BaseEntity {

  @ManyToOne(() => UserEntity)
  userId!: UserEntity;

  @OneToOne(() => ChatEntity)
  chatId!: ChatEntity;

  @Property()
  lastRead!: Date;

  @Enum(() => ChatTypeEnum)
  chatType!: ChatTypeEnum;

}