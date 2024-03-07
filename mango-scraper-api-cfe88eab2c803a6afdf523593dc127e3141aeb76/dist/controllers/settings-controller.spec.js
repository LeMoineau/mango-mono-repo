"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const settings_controller_1 = __importDefault(require("./settings-controller"));
const scrapers_config_1 = __importDefault(require("../config/scrapers-config"));
(0, vitest_1.describe)("settings-controller", () => {
    (0, vitest_1.it)("should return scrapers enabled when getting config", () => {
        const res = settings_controller_1.default.getConfig();
        for (let scraperName of Object.keys(scrapers_config_1.default.scrapers)) {
            (0, vitest_1.expect)(res.scrapersEnabled).toContainEqual(scraperName);
        }
    });
    (0, vitest_1.it)("should return scrapers enabled order by trust level when getting config", () => {
        const res = settings_controller_1.default.getConfig();
        let previousTrustLevel = 0;
        for (let scraperName of res.scrapersEnabled) {
            (0, vitest_1.expect)(scrapers_config_1.default.scrapers[scraperName].trustLevel).toBeGreaterThanOrEqual(previousTrustLevel);
            previousTrustLevel = scrapers_config_1.default.scrapers[scraperName].trustLevel;
        }
    });
});
