"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mangaplus_scraper_1 = __importDefault(require("../scrapers/mangaplus/mangaplus-scraper"));
const mangasaki_scraper_1 = __importDefault(require("../scrapers/mangasaki/mangasaki-scraper"));
exports.default = {
    scrapers: {
        mangaplus: {
            enabled: true,
            trustLevel: 1,
            scraper: mangaplus_scraper_1.default,
        },
        mangasaki: {
            enabled: true,
            trustLevel: 2,
            scraper: mangasaki_scraper_1.default,
        },
    },
};
