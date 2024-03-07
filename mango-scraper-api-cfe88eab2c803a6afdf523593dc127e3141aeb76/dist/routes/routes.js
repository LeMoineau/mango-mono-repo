"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chapters_routes_1 = __importDefault(require("./chapters-routes"));
const mangas_routes_1 = __importDefault(require("./mangas-routes"));
const settings_routes_1 = __importDefault(require("./settings-routes"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    res.send("Express + TypeScript Server");
});
router.use("/chapters", chapters_routes_1.default);
router.use("/mangas", mangas_routes_1.default);
router.use("/settings", settings_routes_1.default);
exports.default = router;
