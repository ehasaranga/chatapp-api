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

export type TDefineModelArgs<N extends string, E, K> = {
    name: Capitalize<N>;
    entity: E;
    defaultEndpoints?: boolean;
    endpoints: (model:TDefineModelArgs<N, E, K>) => TEndpoint[];
    repo: () => K;
}
