"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrongScrapersConfigError extends Error {
    constructor(message) {
        super(`error encounter when parsing scrapers-config ${message && `: ${message}`}`);
    }
}
exports.default = WrongScrapersConfigError;
