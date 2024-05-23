import { endpoint } from "@core";

export const defineModel = <N extends string,E, K, T extends TDefineModel<N, E, K> = TDefineModel<N, E, K>>(args: TDefineModel<N, E, K>) => {

    // const crud = typeof args.crud === 'undefined' ? true : args.crud;

    const endpoints = [...args.endpoints]

    return {
        name: args.name,
        entity: args.entity,
        endpoints,
        repo: args.repo
    } as const

}

// export const modelObj = <T extends TDefineModel<string>, K extends T['name'] = T['name']> (models: T[]) => {

//     const obj = models.reduce((acc, item: T) => {

//         acc[item.name as K] = item;

//         return acc

//     }, {} as Record<K, T>)

//     return obj 

// }

export type TDefineModel<N extends string, Entity, K> = {
    name: Capitalize<N>;
    entity: Entity;
    endpoints: ReturnType<typeof endpoint>[];
    repo: () => K;
}
