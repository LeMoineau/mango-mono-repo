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
const scrapers_config_1 = __importDefault(require("../config/scrapers-config"));
const object_utils_1 = require("../services/object-utils");
const text_format_utils_1 = require("../services/text-format-utils");
class ScraperController {
    constructor(options) {
        this.scrapersEnabled = {};
        this.trustedScrapers = [];
        for (let scraperName of Object.keys(options.scrapers)) {
            const targetScraper = options.scrapers[scraperName];
            if (!targetScraper.enabled) {
                continue;
            }
            this.scrapersEnabled[scraperName] = targetScraper.scraper;
            this.trustedScrapers[targetScraper.trustLevel] = scraperName;
        }
    }
    getLatestChaptersOfAllScrapers() {
        return __awaiter(this, void 0, void 0, function* () {
            const chapters = [];
            yield object_utils_1.ObjectUtils.forEachKeyInObject(this.scrapersEnabled, (scraperName, scraper) => __awaiter(this, void 0, void 0, function* () {
                const scraperChapters = yield scraper.getLatestChapters();
                this.appendChapterToIntersiteChapters(chapters, scraperChapters, scraperName);
            }));
            return chapters;
        });
    }
    appendChapterToIntersiteChapters(intersiteChapters, chaptersToAppend, scraperName) {
        for (let c of chaptersToAppend) {
            let sameChapter = intersiteChapters.find((ic) => this.findSameChapterFromDifferentSrc(ic, c));
            if (!sameChapter) {
                sameChapter = {
                    title: {},
                    number: {},
                    formattedNumber: text_format_utils_1.TextFormatUtils.formatChapterNumber(c.number),
                    image: {},
                    id: {},
                    manga: {
                        formattedTitle: text_format_utils_1.TextFormatUtils.formatMangaTitle(c.manga.title),
                        title: {},
                        id: {},
                    },
                };
                intersiteChapters.push(sameChapter);
            }
            if (!sameChapter) {
                continue;
            }
            sameChapter.title[scraperName] = c.title;
            sameChapter.number[scraperName] = c.number;
            sameChapter.image[scraperName] = c.image;
            sameChapter.id[scraperName] = c.id;
            sameChapter.manga.title[scraperName] = c.manga.title;
            sameChapter.manga.id[scraperName] = c.manga.id;
        }
    }
    findSameChapterFromDifferentSrc(intersiteChapter, scrapedChapter) {
        return (intersiteChapter.manga.formattedTitle ===
            text_format_utils_1.TextFormatUtils.formatMangaTitle(scrapedChapter.manga.title) &&
            intersiteChapter.formattedNumber ===
                text_format_utils_1.TextFormatUtils.formatChapterNumber(scrapedChapter.number));
    }
}
exports.default = new ScraperController(scrapers_config_1.default);
