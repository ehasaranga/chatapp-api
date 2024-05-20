import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";

@Entity({tableName: 'user'})
export class UserEntity extends BaseEntity {

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property({ nullable: true })
  age?: number;

}