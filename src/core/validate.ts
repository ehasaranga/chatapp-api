import z from "zod";


export const validate = <TData>(data: unknown, schema: z.Schema<TData>) => {

    const safeParse = schema.safeParse(data);

    if (!safeParse.success) throw safeParse.error;

    return safeParse.data
}