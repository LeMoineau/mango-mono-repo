"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const text_format_utils_1 = require("./text-format-utils");
(0, vitest_1.describe)("text-format-utils", () => {
    (0, vitest_1.it)("should remove left 0 when format chapter number", () => {
        const A_CHAPTER_NUMBER = "045";
        const res = text_format_utils_1.TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);
        (0, vitest_1.expect)(res).toBe("45");
    });
    (0, vitest_1.it)("should remove unused space when format chapter number", () => {
        const A_CHAPTER_NUMBER = "  45   ";
        const res = text_format_utils_1.TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);
        (0, vitest_1.expect)(res).toBe("45");
    });
    (0, vitest_1.it)("should not fail when chapter number is a string", () => {
        const A_CHAPTER_NUMBER = "S7-45";
        const res = text_format_utils_1.TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);
        (0, vitest_1.expect)(res).toBe("S7-45");
    });
    (0, vitest_1.it)("should put to lowercase when format manga title", () => {
        const A_MANGA_TITLE = "OnePiece";
        const res = text_format_utils_1.TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);
        (0, vitest_1.expect)(res).toBe("onepiece");
    });
    (0, vitest_1.it)("should remove unused space when format manga title", () => {
        const A_MANGA_TITLE = "   onepiece    ";
        const res = text_format_utils_1.TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);
        (0, vitest_1.expect)(res).toBe("onepiece");
    });
    (0, vitest_1.it)("it should keep only character when format manga title", () => {
        const A_MANGA_TITLE = "L'épopé";
        const res = text_format_utils_1.TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);
        (0, vitest_1.expect)(res).toBe("lpop");
    });
});
