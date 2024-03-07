"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplittingError extends Error {
    constructor(src, splitter) {
        super(`a splitting error occured for string "${src}" with splitter "${splitter}"`);
    }
}
exports.default = SplittingError;
