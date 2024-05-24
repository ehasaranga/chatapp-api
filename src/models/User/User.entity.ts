import { Entity, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";

@Entity({tableName: 'user'})
export class UserEntity extends BaseEntity {

  @Property()
  userID!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  @Unique()
  email!: string;

  @Property({ nullable: true })
  age?: number;

}