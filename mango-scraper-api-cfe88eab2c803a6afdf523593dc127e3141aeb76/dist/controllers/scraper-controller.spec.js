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
const scraper_controller_1 = __importDefault(require("./scraper-controller"));
const scrapers_config_1 = __importDefault(require("../config/scrapers-config"));
const object_utils_1 = require("../services/object-utils");
(0, vitest_1.describe)("scraper-controller", () => {
    const A_CHAPTER = {
        id: "naruto-1",
        image: "an url",
        manga: {
            title: "naruto",
            id: "naruto",
        },
        number: "1",
        title: "new beginning",
    };
    let A_INTERSITE_CHAPTER;
    const A_SCRAPER_NAME = "mangaplus";
    (0, vitest_1.beforeEach)(() => {
        A_INTERSITE_CHAPTER = {
            title: { mangaplus: A_CHAPTER.title },
            number: { mangaplus: A_CHAPTER.number },
            formattedNumber: "1",
            image: { mangaplus: A_CHAPTER.image },
            id: { mangaplus: A_CHAPTER.id },
            manga: {
                formattedTitle: "naruto",
                title: { mangaplus: A_CHAPTER.manga.title },
                id: { mangaplus: A_CHAPTER.manga.id },
            },
        };
    });
    (0, vitest_1.it)("should store enabled scrapers from config when initialize", () => {
        for (let scraperName of Object.keys(scrapers_config_1.default.scrapers)) {
            if (scrapers_config_1.default.scrapers[scraperName].enabled) {
                (0, vitest_1.expect)(scraper_controller_1.default["scrapersEnabled"][scraperName]).toBe(scrapers_config_1.default.scrapers[scraperName].scraper);
            }
        }
    });
    (0, vitest_1.it)("should store scraper trustLevels from config when initialize", () => {
        for (let scraperName of Object.keys(scrapers_config_1.default.scrapers)) {
            if (scrapers_config_1.default.scrapers[scraperName].enabled) {
                (0, vitest_1.expect)(scraper_controller_1.default["trustedScrapers"][scrapers_config_1.default.scrapers[scraperName].trustLevel]).toBe(scraperName);
            }
        }
    });
    (0, vitest_1.it)("should call getLatestChapters of every enabled chapters when getting latests chapters of all scrapers", () => __awaiter(void 0, void 0, void 0, function* () {
        object_utils_1.ObjectUtils.forEachKeyInObject(scraper_controller_1.default["scrapersEnabled"], (_, v) => {
            vitest_1.vi.spyOn(v, "getLatestChapters").mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () { return []; }));
        });
        yield scraper_controller_1.default.getLatestChaptersOfAllScrapers();
        object_utils_1.ObjectUtils.forEachKeyInObject(scraper_controller_1.default["scrapersEnabled"], (_, v) => {
            (0, vitest_1.expect)(v.getLatestChapters).toHaveBeenCalled();
        });
    }));
    (0, vitest_1.it)("should append chapter to intersite chapters when chapter not exist", () => {
        const intersiteChapters = [];
        const chapters = [A_CHAPTER];
        scraper_controller_1.default["appendChapterToIntersiteChapters"](intersiteChapters, chapters, A_SCRAPER_NAME);
        (0, vitest_1.expect)(intersiteChapters).toStrictEqual([A_INTERSITE_CHAPTER]);
    });
    (0, vitest_1.it)("should append src to intersite chapter when chapter exist", () => {
        const intersiteChapters = [A_INTERSITE_CHAPTER];
        const chapters = [A_CHAPTER];
        const ANOTHER_SCRAPER_NAME = "mangasaki";
        scraper_controller_1.default["appendChapterToIntersiteChapters"](intersiteChapters, chapters, ANOTHER_SCRAPER_NAME);
        (0, vitest_1.expect)(intersiteChapters).toStrictEqual([
            {
                title: { mangaplus: A_CHAPTER.title, mangasaki: A_CHAPTER.title },
                number: { mangaplus: A_CHAPTER.number, mangasaki: A_CHAPTER.number },
                formattedNumber: "1",
                image: { mangaplus: A_CHAPTER.image, mangasaki: A_CHAPTER.image },
                id: { mangaplus: A_CHAPTER.id, mangasaki: A_CHAPTER.id },
                manga: {
                    formattedTitle: "naruto",
                    title: {
                        mangaplus: A_CHAPTER.manga.title,
                        mangasaki: A_CHAPTER.manga.title,
                    },
                    id: { mangaplus: A_CHAPTER.manga.id, mangasaki: A_CHAPTER.manga.id },
                },
            },
        ]);
    });
    (0, vitest_1.it)("should find scraped chapter same of intersite chapter", () => {
        (0, vitest_1.expect)(scraper_controller_1.default["findSameChapterFromDifferentSrc"](A_INTERSITE_CHAPTER, A_CHAPTER)).toBeTruthy();
    });
    (0, vitest_1.it)("should not find scraped chapter same of not same intersite chapter when not same number", () => {
        A_INTERSITE_CHAPTER.formattedNumber = "2";
        (0, vitest_1.expect)(scraper_controller_1.default["findSameChapterFromDifferentSrc"](A_INTERSITE_CHAPTER, A_CHAPTER)).toBeFalsy();
    });
    (0, vitest_1.it)("should not find scraped chapter same of not same intersite chapter when not same manga title", () => {
        A_INTERSITE_CHAPTER.manga.formattedTitle = "onepiece";
        (0, vitest_1.expect)(scraper_controller_1.default["findSameChapterFromDifferentSrc"](A_INTERSITE_CHAPTER, A_CHAPTER)).toBeFalsy();
    });
});
