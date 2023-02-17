"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPlaya = () => {
    function Playa(args) {
        var _a;
        const apiVersion = (_a = args.apiVersion) !== null && _a !== void 0 ? _a : 'latest';
        return {
            ping: () => 'pong',
        };
    }
    return Playa;
};
exports.default = createPlaya;
