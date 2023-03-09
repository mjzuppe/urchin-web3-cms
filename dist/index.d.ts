import { PlayaArgs } from './types/core';
declare const urchin: (args: PlayaArgs) => {
    asset: {
        create: (payload: import("./types/asset").CreateAssetPayload) => import("./types/asset").CreateAssetPayload;
        get: (publicKeys?: string[]) => import("./types/asset").Asset[];
    };
    entry: {
        create: (payload: import("./types/entry").CreateEntryPayload) => import("./types/entry").Entry;
        get: (publicKeys?: string[]) => import("./types/entry").Entry[];
    };
    preflight: () => Promise<{
        asset: import("./types/asset").AssetQueues;
        cluster: string;
        entry: import("./types/entry").EntryQueues;
        payer: string;
        rpc: string;
        taxonomy: import("./types/taxonomy").TaxonomyQueues;
        template: import("./types/template").TemplateQueues;
    }>;
    process: () => Promise<{
        completed: boolean;
        taxonomy: any;
    }>;
    taxonomy: {
        create: (payload: import("./types/taxonomy").TaxonomyCreatePayload[]) => import("./types/taxonomy").TaxonomyCreatePayload[];
        queue: () => import("./types/taxonomy").TaxonomyQueues;
        get: (publicKeys?: string[]) => import("./types/taxonomy").Taxonomy[];
        update: (payload: import("./types/taxonomy").TaxonomyUpdatePayload) => import("./types/taxonomy").TaxonomyUpdatePayload;
    };
    template: {
        create: (payload: import("./types/template").CreateTemplatePayload) => import("./types/template").Template;
        get: (publicKeys?: string[]) => import("./types/template").Template[];
    };
};
export default urchin;
