"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtils = void 0;
const SplittingError_1 = __importDefault(require("../errors/SplittingError"));
var ArrayUtils;
(function (ArrayUtils) {
    function getLastOf(arr) {
        return arr[arr.length - 1];
    }
    ArrayUtils.getLastOf = getLastOf;
    /**
     * Try to split and get the n-element but return return the src if dont succeed
     * Can throw SplittingError instead of returning src in error case
     * @param arr
     * @param splitter
     * @param n
     * @param throwError
     * @returns n-element of src if error or SplittingError if throwError true
     */
    function tryingSplitAndGet(arr, splitter, n = 1, throwError = false) {
        const res = arr.split(splitter)[n];
        if (res) {
            return res;
        }
        if (!res && !throwError) {
            return arr;
        }
        throw new SplittingError_1.default(arr, splitter);
    }
    ArrayUtils.tryingSplitAndGet = tryingSplitAndGet;
})(ArrayUtils || (exports.ArrayUtils = ArrayUtils = {}));
