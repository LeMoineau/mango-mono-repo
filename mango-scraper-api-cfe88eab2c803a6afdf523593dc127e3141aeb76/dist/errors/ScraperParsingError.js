"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScraperParsingError extends Error {
    constructor(message) {
        super(`a parsing error occured during scraping ${message && `: ${message}`}`);
    }
}
exports.default = ScraperParsingError;
