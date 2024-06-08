export type UnionString<T> = T | Omit<T, string>


export type ArrayToCustomKeyObj<Key extends keyof A[number], A extends Record<Key, any>[], ResultType = any> = {
    [K in A[number][Key]]?: ResultType;
};