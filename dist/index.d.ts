declare const createPlaya: () => {
    taxonomy: () => any;
    getQueue: () => any;
    run: () => {
        id: string;
        pubkey: string;
        success: boolean;
    };
};
export default createPlaya;
