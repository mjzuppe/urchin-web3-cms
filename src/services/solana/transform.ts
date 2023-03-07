import { PublicKey } from "@solana/web3.js"
import { TaxonomyOutput } from "../../types/taxonomy"

export const formatTaxonomyAccounts = (source:TaxonomyOutput[]) => {
    return source.map((taxonomy) => {
        return {
            publicKey: taxonomy.publickey.toString(),
            label: taxonomy.account.label,
            owner: taxonomy.account.owner.toString(),
            parent: taxonomy.account.parent? taxonomy.account.parent.toString() : null,
        }
    })
}