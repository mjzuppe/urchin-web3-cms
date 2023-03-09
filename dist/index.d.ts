import { PlayaArgs } from './types/core';
declare const urchin: (args: PlayaArgs) => {
    asset: {
        create: (payload: import("./types/asset").AssetCreatePayload[]) => import("./types/asset").AssetCreatePayload[];
        get: (publicKeys?: string[]) => import("./types/asset").Asset[];
    };
    entry: {
        create: (payload: import("./types/entry").EntryCreatePayload[]) => import("./types/entry").EntryCreatePayload[];
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
        template: any;
    }>;
    taxonomy: {
        create: (payload: import("./types/taxonomy").TaxonomyCreatePayload[]) => import("./types/taxonomy").TaxonomyCreatePayload[];
        queue: () => import("./types/taxonomy").TaxonomyQueues;
        get: (publicKeys?: string[]) => import("./types/taxonomy").Taxonomy[];
        update: (payload: import("./types/taxonomy").TaxonomyUpdatePayload) => import("./types/taxonomy").TaxonomyUpdatePayload;
    };
    template: {
        create: (payload: import("./types/template").TemplateCreatePayload[]) => import("./types/template").TemplateCreatePayload[];
        update: (payload: import("./types/template").TemplateUpdatePayload[]) => import("./types/template").TemplateUpdatePayload[];
        get: (publicKeys?: string[]) => import("./types/template").Template[];
    };
};
export default urchin;
