import { PlayaArgs } from './types/core';


const createPlaya = () => {
    const queue_taxonomy:any = [];
    return {
        taxonomy: () => taxonomy(queue_taxonomy),
        getQueue: () => {
            return queue_taxonomy;
        },
        run: () => processQueue(queue_taxonomy)
    };
};

// summary functions for TAXONOMY model - should this be in it's own file?
const taxonomy:any = (queue:any) => {
    return {
        create: (payload:any) => createTaxonomy(queue, payload),
    }
}


// dedicated function for TAXONOMY model - should this be in it's own file?
const createTaxonomy = (queue:any, payload:any) => {
    const { label } = payload; // TODO Need to setup validation for this input (label:string and required)
    queue.push({label});
    return "taxonomy created";
    
}

// Unlike others, we have a few functions that WONT reference model e.g. playa.run() INSTEAD OF playa.taxonomy().create() -- what file should this be in?
const processQueue = (queue:any) => {
    const createSolanaRecords = () => { // TODO: add to dedicated services folder for SOLANA
        // do something
        return {
            pubkey: "111111111111111111111111"
        }
    }
    const uploadToArweave = () => { // TODO: add to dedicated services folder for ARWEAVE
        // do something
        return {
            id: "222222222222222222222222"
        }
    }
    const r1 = createSolanaRecords();
    const r2 = uploadToArweave();
    return {success: true, ...r1, ...r2};
}



export default createPlaya;


