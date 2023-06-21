"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTimeSpent = void 0;
const fetchTimeSpent = async (context) => {
    try {
        console.log('fetchTimeSpent context:', context);
        if (!context || !context.timeSpentData) {
            console.error('Error: Invalid context or missing timeSpentData');
            return [];
        }
        const result = Object.entries(context.timeSpentData).map(([website, time]) => {
            if (typeof time !== 'number') {
                console.warn(`Warning: Time is not a number for ${website}, using 0 as default value`);
                return { website, time: 0 };
            }
            console.log('website:', website, 'time:', time);
            return { website, time };
        });
        console.log('fetchTimeSpent result:', result);
        return result;
    }
    catch (error) {
        console.error('Error in fetchTimeSpent:', error);
        return [];
    }
};
exports.fetchTimeSpent = fetchTimeSpent;
//# sourceMappingURL=WebsiteService.js.map