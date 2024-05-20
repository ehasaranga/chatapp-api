import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";

@Entity()
export class MessageEntity extends BaseEntity {

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ nullable: true })
  age?: number;

}