import { endpointHandler } from "@core";

export const defineModel = <N extends string, T extends TDefineModel<N> = TDefineModel<N>>(args: TDefineModelArgs<N>): T => {

    // const crud = typeof args.crud === 'undefined' ? true : args.crud;

    const endpoints = [...args.endpoints]

    return {
        name: args.name,
        entity: args.entity,
        endpoints
    } as T

}

export const modelObj = <T extends TDefineModel<string>, K extends T['name'] = T['name']> (models: T[]) => {

    const obj = models.reduce((acc, item) => {

        acc[item.name as K] = item;

        return acc

    }, {} as Record<K, T>)

    return obj 

}

export type TDefineModel <N extends string> = {
    name: Capitalize<N>;
    entity: any;
    endpoints: ReturnType<typeof endpointHandler>[]
}

type TDefineModelArgs <N extends string> = TDefineModel<N> & {
    crud?: boolean;
}


