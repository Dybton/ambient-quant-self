"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = require("./resolvers");
describe('mergeSleepData', () => {
    it('merges the total sleep duration for duplicate days', () => {
        const rawData = [
            {
                id: '1',
                day: '2023-03-20',
                total_sleep_duration: 3600,
                type: 'sleep',
            },
            {
                id: '2',
                day: '2023-03-21',
                total_sleep_duration: 2400,
                type: 'sleep',
            },
            {
                id: '3',
                day: '2023-03-20',
                total_sleep_duration: 1800,
                type: 'sleep',
            },
        ];
        const expectedSleepData = [
            {
                day: '2023-03-20',
                total_sleep_duration: 5400,
            },
            {
                day: '2023-03-21',
                total_sleep_duration: 2400,
            },
        ];
        const result = (0, resolvers_1.mergeSleepData)(rawData);
        expect(result).toEqual(expectedSleepData);
    });
});
//# sourceMappingURL=test.js.map