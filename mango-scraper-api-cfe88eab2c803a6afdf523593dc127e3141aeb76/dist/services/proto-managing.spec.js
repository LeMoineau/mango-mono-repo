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
const proto_managing_1 = require("./proto-managing");
const protobufjs_1 = __importDefault(require("protobufjs"));
const axios_1 = __importDefault(require("axios"));
(0, vitest_1.describe)("proto-managing", () => {
    const A_FILENAME = "test.proto";
    const A_TYPE_NAME = "scraper.type";
    const A_ROOT = {
        lookupType: vitest_1.vi.fn(),
    };
    const A_TYPE = {
        decode: vitest_1.vi.fn(),
    };
    const A_MESSAGE = {
        toJSON: vitest_1.vi.fn(),
    };
    const A_READER = {};
    const AN_URL = "an url";
    const AN_AXIOS_RESPONSE_DATA = "data";
    (0, vitest_1.it)("should call load when loading proto file async", () => {
        vitest_1.vi.spyOn(protobufjs_1.default, "load").mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () { return A_ROOT; }));
        proto_managing_1.ProtoManaging.loadProtoFileAsync(A_FILENAME, A_TYPE_NAME);
        (0, vitest_1.expect)(protobufjs_1.default.load).toHaveBeenCalledWith(A_FILENAME, vitest_1.expect.anything());
    });
    (0, vitest_1.it)("should call decode when decode to json", () => {
        vitest_1.vi.spyOn(A_TYPE, "decode").mockReturnValue(A_MESSAGE);
        proto_managing_1.ProtoManaging.decodeToJson(A_TYPE, A_READER);
        (0, vitest_1.expect)(A_TYPE.decode).toHaveBeenCalledWith(A_READER);
    });
    (0, vitest_1.it)("should call toJson when decode to json", () => {
        vitest_1.vi.spyOn(A_TYPE, "decode").mockReturnValue(A_MESSAGE);
        proto_managing_1.ProtoManaging.decodeToJson(A_TYPE, A_READER);
        (0, vitest_1.expect)(A_MESSAGE.toJSON).toHaveBeenCalled();
    });
    (0, vitest_1.it)("should call axios get with correct parameters when http get proto file", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(axios_1.default, "get").mockResolvedValue({ data: "" });
        yield proto_managing_1.ProtoManaging.httpGetProtoFile(AN_URL);
        (0, vitest_1.expect)(axios_1.default.get).toHaveBeenCalledWith(AN_URL, {
            responseType: "arraybuffer",
        });
    }));
    (0, vitest_1.it)("should return axios response data when http get proto file", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(axios_1.default, "get").mockResolvedValue({ data: AN_AXIOS_RESPONSE_DATA });
        const data = yield proto_managing_1.ProtoManaging.httpGetProtoFile(AN_URL);
        (0, vitest_1.expect)(data).toBe(AN_AXIOS_RESPONSE_DATA);
    }));
});
