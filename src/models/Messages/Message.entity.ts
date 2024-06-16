import { Entity, ManyToMany, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";
import { UserEntity } from "@app/models/User/User.entity";
import { ChatEntity, type ChatTypes } from "@app/models/Chats/Chat.entity";

@Entity({ tableName: 'messages' })
export class MessageEntity extends BaseEntity {

  @ManyToOne(() => UserEntity)
  senderId!: UserEntity;

  //canbe either groupId or chatId
  @ManyToOne(() => ChatEntity)
  chatId!: ChatEntity;

  @Property()
  message!: string;

  @Property()
  chatType!: ChatTypes;

}