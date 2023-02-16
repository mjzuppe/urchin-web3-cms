"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPlaya = () => {
    function Playa({ params }) {
        return {
            ping: () => 'pong',
        };
    }
    return Playa;
};
exports.default = createPlaya;
