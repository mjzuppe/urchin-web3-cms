declare const processAll: (props: any) => Promise<{
    completed: boolean;
    taxonomy: any;
    template: any;
    entry: any;
    asset: any;
}>;
declare const queryAll: (props: any) => Promise<{
    asset: import("../../types/asset").AssetQueues;
    cluster: string;
    entry: import("../../types/entry").EntryQueues;
    payer: string;
    rpc: string;
    taxonomy: import("../../types/taxonomy").TaxonomyQueues;
    template: import("../../types/template").TemplateQueues;
    assets: import("../../types/asset").AssetQueues;
    entries: import("../../types/entry").EntryQueues;
}>;
export { processAll, queryAll };
