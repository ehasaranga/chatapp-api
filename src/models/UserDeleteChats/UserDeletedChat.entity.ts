import { Entity, Enum, ManyToOne, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";
import { UserEntity } from "@app/models/User/User.entity";
import { ChatEntity, ChatTypeEnum } from "@app/models/Chats/Chat.entity";

@Entity({ tableName: 'user_deleted_chats' })
export class UserDeletedChatEntity extends BaseEntity {

  @ManyToOne(() => UserEntity)
  userId!: UserEntity;

  @OneToOne(() => ChatEntity)
  chatId!: ChatEntity;

  @Property()
  deletedAt!: Date;

  @Enum(() => ChatTypeEnum)
  chatType!: ChatTypeEnum;

}