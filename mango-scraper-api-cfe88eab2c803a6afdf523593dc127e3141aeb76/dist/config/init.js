"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const scraping_utils_1 = require("../services/scraping-utils");
const scrapers_config_1 = __importDefault(require("./scrapers-config"));
dotenv_1.default.config();
scraping_utils_1.ScrapingUtils.verifyConfig(scrapers_config_1.default);
