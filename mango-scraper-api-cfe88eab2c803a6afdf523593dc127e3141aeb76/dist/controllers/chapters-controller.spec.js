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
const scraper_controller_1 = __importDefault(require("./scraper-controller"));
const chapters_controller_1 = __importDefault(require("./chapters-controller"));
(0, vitest_1.describe)("chapters-controller", () => {
    (0, vitest_1.it)("should call scraper controller getLatestChapters method", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(scraper_controller_1.default, "getLatestChaptersOfAllScrapers").mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () { return []; }));
        yield chapters_controller_1.default.getAll();
        (0, vitest_1.expect)(scraper_controller_1.default.getLatestChaptersOfAllScrapers).toHaveBeenCalled();
    }));
});
