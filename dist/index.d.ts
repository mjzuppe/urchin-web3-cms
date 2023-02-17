import { PlayaArgs } from './types/core';
declare const createPlaya: () => (args: PlayaArgs) => {
    ping: () => string;
};
export default createPlaya;
