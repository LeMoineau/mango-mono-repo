"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrapers_config_1 = __importDefault(require("../config/scrapers-config"));
class SettingsController {
    getConfig() {
        return {
            scrapersEnabled: Object.keys(scrapers_config_1.default.scrapers).sort((a, b) => scrapers_config_1.default.scrapers[a].trustLevel -
                scrapers_config_1.default.scrapers[b].trustLevel),
        };
    }
}
exports.default = new SettingsController();
