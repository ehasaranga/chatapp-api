import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";
import { UserEntity } from "@app/models/User/User.entity";
import { ChatEntity, ChatTypeEnum } from "@app/models/Chats/Chat.entity";

@Entity({ tableName: 'user_deleted_chats' })
export class UserDeletedChat extends BaseEntity {

  @ManyToOne(() => UserEntity)
  userId!: UserEntity;

  @ManyToOne(() => ChatEntity)
  chatId!: ChatEntity;

  @Property()
  deletedAt!: Date;

  @Enum(() => ChatTypeEnum)
  chatType!: ChatTypeEnum;

}