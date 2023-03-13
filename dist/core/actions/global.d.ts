/// <reference types="@solana/web3.js" />
declare const processAll: (props: any) => Promise<{
    completed: boolean;
    taxonomy: any;
    template: any;
    entry: any;
    asset: any;
}>;
declare const queryAll: (props: any) => Promise<{
    asset: import("../../types/asset").AssetQueues;
    cluster: import("@solana/web3.js").Cluster;
    entry: import("../../types/entry").EntryQueues;
    payer: string;
    rpc: string;
    taxonomy: import("../../types/taxonomy").TaxonomyQueues;
    template: import("../../types/template").TemplateQueues;
    entries: import("../../types/entry").EntryQueues;
}>;
export { processAll, queryAll };
