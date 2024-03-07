"use strict";
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
const mangasaki_scraper_1 = __importDefault(require("./mangasaki-scraper"));
const scraping_utils_1 = require("../../services/scraping-utils");
const cheerio_1 = require("cheerio");
const actual_mangasaki_page_spec_1 = require("./test-examples/actual-mangasaki-page.spec");
(0, vitest_1.describe)("mangasaki-scraper", () => {
    const A_$ = (0, cheerio_1.load)(actual_mangasaki_page_spec_1.MANGASAKI_HOME_PAGE_HTML);
    const THE_MANGASAKI_HOME_PAGE = (0, cheerio_1.load)(actual_mangasaki_page_spec_1.MANGASAKI_HOME_PAGE_HTML);
    (0, vitest_1.it)("should call request cheerio page when getting latest chapters", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(scraping_utils_1.ScrapingUtils, "requestToCheerioPage").mockResolvedValue(A_$);
        yield mangasaki_scraper_1.default.getLatestChapters();
        (0, vitest_1.expect)(scraping_utils_1.ScrapingUtils.requestToCheerioPage).toHaveBeenCalledWith(mangasaki_scraper_1.default["PAGE_URL"]);
    }));
    (0, vitest_1.it)("should return complete chapter array when getting latest chapters", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(scraping_utils_1.ScrapingUtils, "requestToCheerioPage").mockResolvedValue(THE_MANGASAKI_HOME_PAGE);
        const chapters = yield mangasaki_scraper_1.default.getLatestChapters();
        (0, vitest_1.expect)(Array.isArray(chapters)).toBeTruthy();
        (0, vitest_1.expectTypeOf)(chapters).toEqualTypeOf();
    }));
    (0, vitest_1.it)("should return filled chapter array when getting latest chapters", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(scraping_utils_1.ScrapingUtils, "requestToCheerioPage").mockResolvedValue(THE_MANGASAKI_HOME_PAGE);
        const chapters = yield mangasaki_scraper_1.default.getLatestChapters();
        (0, vitest_1.expect)(chapters.length).toBeGreaterThan(0);
        for (let c of chapters) {
            (0, vitest_1.expect)(c.id).toBeDefined();
            (0, vitest_1.expect)(c.image).toBeDefined();
            (0, vitest_1.expect)(c.number).toBeDefined();
            (0, vitest_1.expect)(c.title).toBeDefined();
            (0, vitest_1.expect)(c.manga).toBeDefined();
            (0, vitest_1.expect)(c.manga.title).toBeDefined();
            (0, vitest_1.expect)(c.manga.id).toBeDefined();
        }
    }));
});
