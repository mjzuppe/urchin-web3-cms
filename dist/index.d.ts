import { PlayaArgs } from './types/core';
declare const urchin: (args: PlayaArgs) => {
    asset: {
        create: (payload: import("./types/asset").AssetUserCreatePayload[]) => import("./types/asset").AssetUserCreatePayload[];
        get: (props: any) => Promise<import("./types/asset").Asset[]>;
        getAll: () => Promise<any>;
        update: (payload: import("./types/asset").AssetUserUpdatePayload[]) => import("./types/asset").AssetUserUpdatePayload[];
    };
    entry: {
        create: (payload: import("./types/entry").EntryCreatePayload[]) => import("./types/entry").EntryCreatePayload[];
        queue: () => import("./types/entry").EntryQueues;
        get: (props: any) => Promise<import("./types/entry").Entry[]>;
        getAll: () => Promise<import("./types/entry").Entry[]>;
        update: (payload: import("./types/entry").EntryUpdatePayload[]) => import("./types/entry").EntryUpdatePayload[];
    };
    preflight: () => Promise<any>;
    process: () => Promise<any>;
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
