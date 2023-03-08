declare const processAll: (props: any) => Promise<{
    completed: boolean;
    taxonomy: any;
}>;
declare const queryAll: (props: any) => Promise<{
    cluster: string;
    payer: string;
    rpc: string;
    taxonomy: import("../../types/taxonomy").TaxonomyQueues;
}>;
export { processAll, queryAll };
