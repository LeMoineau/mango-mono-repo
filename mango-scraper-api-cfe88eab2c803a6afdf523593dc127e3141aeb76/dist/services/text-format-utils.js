"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormatUtils = void 0;
var TextFormatUtils;
(function (TextFormatUtils) {
    function formatChapterNumber(chapterNumber) {
        let res = chapterNumber.trim();
        try {
            const numberRes = Number(res); // to remove left 0 as "045"
            if (!Number.isNaN(numberRes)) {
                res = `${numberRes}`;
            }
        }
        catch (_a) { }
        return res;
    }
    TextFormatUtils.formatChapterNumber = formatChapterNumber;
    function formatMangaTitle(title) {
        let res = title
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, "");
        return res;
    }
    TextFormatUtils.formatMangaTitle = formatMangaTitle;
})(TextFormatUtils || (exports.TextFormatUtils = TextFormatUtils = {}));
