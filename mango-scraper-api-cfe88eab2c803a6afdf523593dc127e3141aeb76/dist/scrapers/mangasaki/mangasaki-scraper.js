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
Object.defineProperty(exports, "__esModule", { value: true });
const scraping_utils_1 = require("../../services/scraping-utils");
const array_utils_1 = require("../../services/array-utils");
class MangaSakiScraper {
    constructor() {
        var _a;
        this.PAGE_URL = (_a = process.env.MANGASAKI_URL) !== null && _a !== void 0 ? _a : "https://mangasaki.org";
    }
    getLatestChapters() {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(this.PAGE_URL);
            const chapters = [];
            $("ul#latest-list > li").each((i) => {
                const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
                $(`${currentMangaPath} .item-list ul li .item-list ul li`).each((j) => {
                    const currentChapterPath = `${currentMangaPath} .item-list ul li .item-list ul li:nth-child(${j + 1})`;
                    try {
                        chapters.push({
                            image: $(`${currentMangaPath} a:first-child img`).attr("src"),
                            manga: {
                                title: $(`${currentMangaPath} .item-list ul li .tl a strong`).text(),
                                id: array_utils_1.ArrayUtils.getLastOf($(`${currentMangaPath} .item-list ul li .tl a`)
                                    .attr("href")
                                    .split("/")),
                            },
                            number: array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).text().split(" ")),
                            title: $(`${currentChapterPath} a`).text(),
                            id: array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).attr("href").split("/")),
                        });
                    }
                    catch (e) { }
                });
            });
            return chapters;
        });
    }
    getMangas({ q }) {
        return __awaiter(this, void 0, void 0, function* () {
            throw Error("not yet implemented");
        });
    }
    getManga(name) {
        return __awaiter(this, void 0, void 0, function* () {
            throw Error("not yet implemented");
        });
    }
}
exports.default = new MangaSakiScraper();
