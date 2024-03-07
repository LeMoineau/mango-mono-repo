"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
require("./config/init");
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
const port = process.env.PORT;
app.use(jsonParser);
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.use(express_1.default.static(`${__dirname}/public`));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
