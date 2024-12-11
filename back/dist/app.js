"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connectToDB_1 = __importDefault(require("./config/connectToDB"));
const registerRoute_1 = __importDefault(require("./routes/registerRoute"));
const missionRoutes_1 = __importDefault(require("./routes/missionRoutes"));
const airplaneRoutes_1 = __importDefault(require("./routes/airplaneRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
(0, connectToDB_1.default)();
app.use('/soldiers', registerRoute_1.default);
app.use('/missions', missionRoutes_1.default);
app.use('/planes', airplaneRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
