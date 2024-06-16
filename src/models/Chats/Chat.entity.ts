import { Entity, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";
import { UserEntity } from "@app/models/User/User.entity";

@Entity({ tableName: 'chats' })
export class ChatEntity extends BaseEntity {

  @ManyToOne(() => UserEntity)
  user1Id!: UserEntity;

  @ManyToOne(() => UserEntity)
  user2Id!: UserEntity;

}

export enum ChatTypeEnum {
  GROUP =  'group',
  PEER = 'peer'
}