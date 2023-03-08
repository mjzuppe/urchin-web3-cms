import { PublicKey } from "@solana/web3.js"
import { TaxonomyOutput } from "../../types/taxonomy"

export const formatTaxonomyAccounts = (source:TaxonomyOutput[]) => {
    return source.map((taxonomy) => {
        return {
            publicKey: taxonomy.publicKey.toString(),
            label: taxonomy.label,
            owner: taxonomy.owner.toString(),
            parent: taxonomy.parent? taxonomy.parent.toString() : null,
        }
    })
}