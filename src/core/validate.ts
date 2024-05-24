import z from "zod";


export const validate = <TData>(data: any, schema: z.Schema<TData>) => {

    const isObj = z.instanceof(z.ZodObject).safeParse(schema)

    const primitiveMapZod = {
        string: z.ZodString,
        number: z.ZodNumber
    } as any

    if (isObj.success) {

        for (const key of Object.keys(data)) {

            const keySchemaType = isObj.data.shape[key]
            const keyDataType = typeof data[key]

            let keyVal;

            //checking whether zod schema types matches with data types, if matches continue to next key
            if (z.instanceof(primitiveMapZod[keyDataType]).safeParse(keySchemaType).success) continue;

            //parse to number   
            if (z.instanceof(z.ZodNumber).safeParse(keySchemaType).success) keyVal = Number(data[key])

            // console.log(key, ' ' ,typeof data[key], ' ', isObj.data.shape[key])

            // console.log(key, ' ' ,primitiveMapZod[typeof data[key]], ' ', isObj.data.shape[key])

            //if any error conversion pass original value
            data[key] = keyVal ? keyVal : data[key]

        }

    }

    const safeParse = schema.safeParse(data);

    console.log(data)

    if (!safeParse.success) throw safeParse.error;

    return safeParse.data
}