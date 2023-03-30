"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// chromeApi.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // Import CORS package
const router = express_1.default.Router(); // Create a new router
router.use((0, cors_1.default)()); // Use CORS middleware
router.use(body_parser_1.default.json());
router.post('/website-time', (req, res) => {
    console.log('Received data:', req.body);
    console.log('Received request:', req);
    res.send('Data received');
});
exports.default = router;
//# sourceMappingURL=chromeApi.js.map