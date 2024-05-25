import { TEndpoint, routes } from "@core";

export const defineModel = <N extends string, E, K>(args: TDefineModelArgs<N, E, K>) => {

    let endpoints = args.endpoints(args)

    if (typeof args.defaultEndpoints === 'undefined') endpoints = [...routes(args), ...endpoints]

    return {
        name: args.name,
        entity: args.entity,
        endpoints: endpoints,
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

export type TDefineModelArgs<N extends string, E, K> = {
    name: Capitalize<N>;
    entity: E;
    defaultEndpoints?: boolean;
    endpoints: (model:TDefineModelArgs<N, E, K>) => TEndpoint[];
    repo: () => K;
}
