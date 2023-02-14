const createPlaya = () => {
    function Playa ({ params }: any) {
        return {
            ping: () => 'pong',
        };
    }

    return Playa;
}

export default createPlaya;
