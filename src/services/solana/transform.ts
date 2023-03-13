import { PublicKey } from "@solana/web3.js"
import { TaxonomyOutput } from "../../types/taxonomy";

export const formatTaxonomyAccounts = (source: any) => {
    return source.map((taxonomy: any) =>
        taxonomy.label ? ({
            publicKey: taxonomy.publicKey.toString(),
            label: taxonomy.label,
            owner: taxonomy.owner.toString(),
            parent: taxonomy.parent !== null ? taxonomy.parent.toString() : null,
        }) : ({ publicKey: taxonomy.publicKey.toString() })
    )
}

export const formatTemplateAccounts = async (source: any) => {
    const result = [];
    for (const template of source) {
        if (!template.arweaveId) {
            result.push({ publicKey: template.publicKey.toString() });
        }
        else {
            const arweaveData = await fetch(`https://arweave.net/${template.arweaveId}`);
            const arweaveJson = await arweaveData.json();
            result.push(
                    {
                        publicKey: template.publicKey.toString(),
                        title: template.title,
                        owner: template.owner.toString(),
                        archived: template.archived,
                        arweaveId: template.arweaveId,
                        original: template.original !== null ? template.original.toString() : null,
                        ...arweaveJson
                    })
         
        }
    }
    return result;
}

export const formatEntryAccounts = async (source: any) => {
    const result = [];
    for (const entry of source) {
        if (!entry.arweaveId) {
            result.push({ publicKey: entry.publicKey.toString() });
        }
        else {
            const arweaveData = await fetch(`https://arweave.net/${entry.arweaveId}`);
            const arweaveJson = await arweaveData.json();
            result.push(
                    {
                        publicKey: entry.publicKey.toString(),
                        owner: entry.owner.toString(),
                        template: entry.template.toString(),
                        taxonomy: entry.taxonomy.map((tax:PublicKey)=>tax.toString()),
                        archived: entry.archived,
                        immutable: entry.immutable,
                        arweaveId: entry.arweaveId,
                        ...arweaveJson
                    })
         
        }
    }
    return result;
}




