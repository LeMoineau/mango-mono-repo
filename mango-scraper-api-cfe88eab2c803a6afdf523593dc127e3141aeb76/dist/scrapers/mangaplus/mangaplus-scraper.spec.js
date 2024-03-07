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
const proto_managing_1 = require("../../services/proto-managing");
const correct_response_example_spec_1 = require("./test-examples/correct-response-example.spec");
const mangaplus_scraper_1 = __importDefault(require("./mangaplus-scraper"));
(0, vitest_1.describe)("mangaplus-scraper", () => {
    const A_Uint8Array = {};
    const A_TYPE = {};
    const A_CORRECT_JSON = correct_response_example_spec_1.exampleWeb_homeV3Json;
    (0, vitest_1.beforeAll)(() => {
        vitest_1.vi.spyOn(proto_managing_1.ProtoManaging, "httpGetProtoFile").mockResolvedValue(A_Uint8Array);
        vitest_1.vi.spyOn(proto_managing_1.ProtoManaging, "loadProtoFileAsync").mockResolvedValue(A_TYPE);
        vitest_1.vi.spyOn(proto_managing_1.ProtoManaging, "decodeToJson").mockReturnValue(A_CORRECT_JSON);
    });
    (0, vitest_1.it)("should call ProtoManaging httpGetProtoFile with correct endpoint when get all chapters", () => __awaiter(void 0, void 0, void 0, function* () {
        yield mangaplus_scraper_1.default.getLatestChapters();
        (0, vitest_1.expect)(proto_managing_1.ProtoManaging.httpGetProtoFile).toHaveBeenCalledWith(`${mangaplus_scraper_1.default["API_ENDPOINT"]}/web/web_homeV3?lang=fra`);
    }));
    (0, vitest_1.it)("should call ProtoManaging loadProtoFileAsync when get all chapters", () => __awaiter(void 0, void 0, void 0, function* () {
        yield mangaplus_scraper_1.default.getLatestChapters();
        (0, vitest_1.expect)(proto_managing_1.ProtoManaging.loadProtoFileAsync).toHaveBeenCalled();
    }));
    (0, vitest_1.it)("should call decodeToJson when getting all chapters", () => __awaiter(void 0, void 0, void 0, function* () {
        yield mangaplus_scraper_1.default.getLatestChapters();
        (0, vitest_1.expect)(proto_managing_1.ProtoManaging.decodeToJson).toHaveBeenCalled();
    }));
    (0, vitest_1.it)("should return correct chapters json when getting all chapters", () => __awaiter(void 0, void 0, void 0, function* () {
        const chapters = yield mangaplus_scraper_1.default.getLatestChapters();
        (0, vitest_1.expect)(chapters).toStrictEqual(correct_response_example_spec_1.exampleFinalMangaPlusChaptersJson);
    }));
});
