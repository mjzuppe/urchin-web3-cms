import { PlayaArgs } from './types/core';
declare const playa: ({ apiVersion }: PlayaArgs) => {
    v1: {
        taxonomy: {
            createTaxonomy: (queue: string, payload: any) => void;
            getTaxonomyQueue: (queue: string) => any;
            processTaxonomyQueue: (queue: string) => {
                id: string;
                pubkey: string;
                success: boolean;
            };
        };
    };
};
export default playa;
