import { PublicKey } from "@solana/web3.js"
import { TaxonomyOutput } from "../../types/taxonomy"

const formatTaxonomyAccounts = (source: any) => {
    return source.map((taxonomy:any) =>
    taxonomy.label? ({
        publicKey: taxonomy.publicKey.toString(),
        label: taxonomy.label,
        owner: taxonomy.owner.toString(),
        parent: taxonomy.parent !== null? taxonomy.parent.toString() : null,
    }) : ({publicKey: taxonomy.publicKey.toString()})
    )
}
export default(formatTaxonomyAccounts)