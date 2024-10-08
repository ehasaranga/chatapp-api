import { Entity, Enum, ManyToOne, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";
import { UserEntity } from "@app/models/User/User.entity";
import { ChatEntity, ChatTypeEnum } from "@app/models/Chats/Chat.entity";
import { MessageEntity } from "@app/models/Messages/Message.entity";

@Entity({ tableName: 'user_deleted_messages' })
export class UserDeletedMessagesEntity extends BaseEntity {

  @ManyToOne(() => UserEntity)
  userId!: UserEntity;

  @OneToOne(() => MessageEntity)
  messageId!: MessageEntity;

  @OneToOne(() => ChatEntity)
  chatId!: ChatEntity;

  @Enum(() => ChatTypeEnum)
  chatType!: ChatTypeEnum;

}