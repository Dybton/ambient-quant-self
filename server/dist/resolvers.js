"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        sleepDuration: () => {
            return [
                {
                    date: '2023-03-21',
                    duration: {
                        hours: 0,
                        minutes: 1,
                    },
                },
                {
                    date: '2023-03-21',
                    duration: {
                        hours: 6,
                        minutes: 13,
                    },
                },
            ];
        },
    },
};
//# sourceMappingURL=resolvers.js.map