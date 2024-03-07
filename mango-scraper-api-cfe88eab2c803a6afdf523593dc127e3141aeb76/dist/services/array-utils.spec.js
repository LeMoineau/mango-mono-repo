"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const array_utils_1 = require("./array-utils");
const SplittingError_1 = __importDefault(require("../errors/SplittingError"));
(0, vitest_1.describe)("array-utils", () => {
    let AN_ARRAY = [];
    const THE_LAST_ITEM = 4;
    (0, vitest_1.beforeEach)(() => {
        AN_ARRAY = [1, 2, 3];
    });
    (0, vitest_1.it)("should return last of array", () => {
        AN_ARRAY.push(THE_LAST_ITEM);
        const res = array_utils_1.ArrayUtils.getLastOf(AN_ARRAY);
        (0, vitest_1.expect)(res).toBe(THE_LAST_ITEM);
    });
    (0, vitest_1.it)("should return n from splitting when trying splitting and get", () => {
        const A_STRING = "a,b";
        const A_SPLITTER = ",";
        const AN_INDEX = 1;
        const res = array_utils_1.ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX);
        (0, vitest_1.expect)(res).toBe("b");
    });
    (0, vitest_1.it)("should send src when trying splitting and get on wrong string", () => {
        const A_STRING = "ab";
        const A_SPLITTER = ",";
        const AN_INDEX = 1;
        const res = array_utils_1.ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX);
        (0, vitest_1.expect)(res).toBe(A_STRING);
    });
    (0, vitest_1.it)("should throw splitting error when trying splitting and get on wrong string and throwError true", () => {
        const A_STRING = "ab";
        const A_SPLITTER = ",";
        const AN_INDEX = 1;
        (0, vitest_1.expect)(() => array_utils_1.ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX, true)).toThrow(SplittingError_1.default);
    });
});
