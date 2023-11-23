import { defineModel } from "@core";
import { Message } from "./MessageEntity";

export default defineModel<'Message'>({
    name: 'Message',
    entity: Message,
    endpoints: [],
})