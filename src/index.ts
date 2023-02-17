import { PlayaArgs } from './types/core';

const createPlaya = () => {
    function Playa (args: PlayaArgs) {
        const apiVersion = args.apiVersion ?? 'latest';

        return {
            ping: () => 'pong',
        };
    }

    return Playa;
};

export default createPlaya;
