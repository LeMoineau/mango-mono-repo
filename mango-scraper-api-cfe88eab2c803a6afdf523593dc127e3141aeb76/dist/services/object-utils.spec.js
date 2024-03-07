"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const object_utils_1 = require("./object-utils");
(0, vitest_1.describe)("object-utils", () => {
    (0, vitest_1.it)("should call callback for every key in object", () => {
        const AN_OBJECT = { a: 1, b: 2, c: 3 };
        const A_CALLBACK = vitest_1.vi.fn();
        object_utils_1.ObjectUtils.forEachKeyInObject(AN_OBJECT, A_CALLBACK);
        (0, vitest_1.expect)(A_CALLBACK).toHaveBeenCalledTimes(3);
        (0, vitest_1.expect)(A_CALLBACK).toHaveBeenCalledWith("a", 1);
        (0, vitest_1.expect)(A_CALLBACK).toHaveBeenCalledWith("b", 2);
        (0, vitest_1.expect)(A_CALLBACK).toHaveBeenCalledWith("c", 3);
    });
});
