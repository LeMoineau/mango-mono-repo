"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = __importDefault(require("../controllers/settings-controller"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    res.send(settings_controller_1.default.getConfig());
});
exports.default = router;
