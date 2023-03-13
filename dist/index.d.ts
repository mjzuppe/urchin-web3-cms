/// <reference types="@solana/web3.js" />
import { PlayaArgs } from './types/core';
declare const urchin: (args: PlayaArgs) => {
    asset: {
        create: (payload: import("./types/asset").AssetUserCreatePayload[]) => import("./types/asset").AssetUserCreatePayload[];
        get: (publicKeys?: string[]) => import("./types/asset").Asset[];
        update: (payload: import("./types/asset").AssetUserUpdatePayload[]) => import("./types/asset").AssetUserUpdatePayload[];
    };
    entry: {
        create: (payload: import("./types/entry").EntryCreatePayload[]) => import("./types/entry").EntryCreatePayload[];
        queue: () => import("./types/entry").EntryQueues;
        get: (props: any) => Promise<import("./types/entry").Entry[]>;
        getAll: () => Promise<import("./types/entry").Entry[]>;
        update: (payload: import("./types/entry").EntryUpdatePayload[]) => import("./types/entry").EntryUpdatePayload[];
    };
    preflight: () => Promise<{
        asset: import("./types/asset").AssetQueues;
        cluster: import("@solana/web3.js").Cluster;
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
        entry: any;
        asset: any;
    }>;
    taxonomy: {
        create: (payload: import("./types/taxonomy").TaxonomyCreatePayload[]) => import("./types/taxonomy").TaxonomyCreatePayload[];
        queue: () => import("./types/taxonomy").TaxonomyQueues;
        get: (props: any) => Promise<import("./types/taxonomy").Taxonomy[]>;
        getAll: () => Promise<import("./types/taxonomy").Taxonomy[]>;
        update: (payload: import("./types/taxonomy").TaxonomyUpdatePayload[]) => import("./types/taxonomy").TaxonomyUpdatePayload[];
    };
    template: {
        create: (payload: import("./types/template").TemplateCreatePayload[]) => import("./types/template").TemplateCreatePayload[];
        update: (payload: import("./types/template").TemplateUpdatePayload[]) => import("./types/template").TemplateUpdatePayload[];
        get: (props: any) => Promise<import("./types/template").Template[]>;
        getAll: () => Promise<any>;
    };
};
export default urchin;
