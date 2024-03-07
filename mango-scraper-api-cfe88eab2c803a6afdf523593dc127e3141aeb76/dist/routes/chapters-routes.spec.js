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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const chapters_routes_1 = __importDefault(require("./chapters-routes"));
const chapters_controller_1 = __importDefault(require("../controllers/chapters-controller"));
(0, vitest_1.describe)("chapters-routes", () => {
    const AN_ERROR = "une erreur";
    const app = (0, express_1.default)();
    (0, vitest_1.beforeAll)(() => {
        app.use("/chapters", chapters_routes_1.default);
    });
    (0, vitest_1.it)("should call ChaptersController getAll", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(chapters_controller_1.default, "getAll");
        yield (0, supertest_1.default)(app).get("/chapters");
        (0, vitest_1.expect)(chapters_controller_1.default.getAll).toHaveBeenCalled();
    }));
    (0, vitest_1.it)("should return ok status when getting not error", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(chapters_controller_1.default, "getAll").mockResolvedValue([]);
        yield (0, supertest_1.default)(app).get("/chapters").expect(200);
    }));
    (0, vitest_1.it)("should return 500 status when getting error", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(chapters_controller_1.default, "getAll").mockRejectedValue(AN_ERROR);
        yield (0, supertest_1.default)(app).get("/chapters").expect(500);
    }));
});
