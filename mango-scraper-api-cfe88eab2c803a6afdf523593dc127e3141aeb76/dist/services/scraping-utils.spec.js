"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const scraping_utils_1 = require("./scraping-utils");
const mangaplus_scraper_1 = __importDefault(require("../scrapers/mangaplus/mangaplus-scraper"));
const WrongScrapersConfigError_1 = __importDefault(require("../errors/WrongScrapersConfigError"));
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
// vi.mock("cheerio", () => {
//   return {
//     load: vi.fn(),
//   };
// });
(0, vitest_1.describe)("scraping-utils", () => {
    let A_CORRECT_CONFIG;
    const AN_URL = "an url";
    const AN_AXIOS_RESPONSE = { data: "data" };
    const A_CHEERIO_NODE = {
        text: vitest_1.vi.fn(),
        attr: vitest_1.vi.fn(),
    };
    const AN_UNKNOWN_METHOD = "a method";
    (0, vitest_1.beforeEach)(() => {
        A_CORRECT_CONFIG = {
            scrapers: {
                mangaplus: {
                    enabled: true,
                    trustLevel: 1,
                    scraper: mangaplus_scraper_1.default,
                },
                another: {
                    enabled: true,
                    trustLevel: 2,
                    scraper: mangaplus_scraper_1.default,
                },
            },
        };
    });
    (0, vitest_1.it)("should throw wrong scrapers config error when verify scrapers config with enabled same trustLevel", () => {
        const A_CONFIG_WITH_SAME_TRUSTLEVEL = A_CORRECT_CONFIG;
        A_CONFIG_WITH_SAME_TRUSTLEVEL.scrapers.another.trustLevel = 1;
        (0, vitest_1.expect)(() => scraping_utils_1.ScrapingUtils.verifyConfig(A_CONFIG_WITH_SAME_TRUSTLEVEL)).toThrowError(WrongScrapersConfigError_1.default);
    });
    (0, vitest_1.it)("should be ok when verify scrapers config with same trustLevel but not enabled", () => {
        const A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED = A_CORRECT_CONFIG;
        A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED.scrapers.another.trustLevel = 1;
        A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED.scrapers.another.enabled =
            false;
        (0, vitest_1.expect)(() => scraping_utils_1.ScrapingUtils.verifyConfig(A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED)).not.toThrowError(WrongScrapersConfigError_1.default);
    });
    (0, vitest_1.it)("should call correct axios get when request to cheerio", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(axios_1.default, "get").mockResolvedValue({ data: "" });
        yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(AN_URL);
        (0, vitest_1.expect)(axios_1.default.get).toHaveBeenCalledWith(AN_URL);
    }));
    (0, vitest_1.it)("should call cheerio load when request to cheerio", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(axios_1.default, "get").mockResolvedValue(AN_AXIOS_RESPONSE);
        yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(AN_URL);
        (0, vitest_1.expect)(cheerio.load).toHaveBeenCalledWith(AN_AXIOS_RESPONSE.data);
    }));
});
