import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";

@Entity()
export class Message extends BaseEntity {

    @Property()
    name: string;
  
    @Property()
    email: string;
  
    @Property({ nullable: true })
    age?: number;
  
    constructor(name: string, email: string) {
      super();
      this.name = name;
      this.email = email;
    }
  
  }