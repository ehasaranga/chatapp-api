import { defineModel } from "@core";
import { Message } from "./Message.entity";

export default defineModel<'Message'>({
    name: 'Message',
    entity: Message,
    endpoints: [],
})