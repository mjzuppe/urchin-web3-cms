import { TaxonomyOutput } from "../../types/taxonomy";
export declare const formatTaxonomyAccounts: (source: TaxonomyOutput[]) => {
    publicKey: string;
    label: string;
    owner: string;
    parent: string | null;
}[];
