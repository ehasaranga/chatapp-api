import { endpointHandler } from "@core";

export const defineModel = <N extends string, K, T extends TDefineModel<N, K> = TDefineModel<N, K>>(args: TDefineModel<N, K>): T => {

    // const crud = typeof args.crud === 'undefined' ? true : args.crud;

    const endpoints = [...args.endpoints]

    return {
        name: args.name,
        entity: args.entity,
        endpoints,
        repo: args.repo
    } as T

}

// export const modelObj = <T extends TDefineModel<string>, K extends T['name'] = T['name']> (models: T[]) => {

//     const obj = models.reduce((acc, item: T) => {

//         acc[item.name as K] = item;

//         return acc

//     }, {} as Record<K, T>)

//     return obj 

// }

export type TDefineModel<N extends string, K> = {
    name: Capitalize<N>;
    entity: any;
    endpoints: ReturnType<typeof endpointHandler>[];
    repo: () => K;
}
