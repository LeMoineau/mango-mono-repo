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
const ScraperParsingError_1 = __importDefault(require("../../errors/ScraperParsingError"));
const array_utils_1 = require("../../services/array-utils");
const proto_managing_1 = require("../../services/proto-managing");
const text_format_utils_1 = require("../../services/text-format-utils");
class MangaPlusScraper {
    constructor() {
        var _a;
        this.API_ENDPOINT = (_a = process.env.MANGAPLUS_API_ENDPOINT) !== null && _a !== void 0 ? _a : "https://jumpg-webapi.tokyo-cdn.com/api";
    }
    getLatestChapters() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield proto_managing_1.ProtoManaging.httpGetProtoFile(`${this.API_ENDPOINT}/web/web_homeV3?lang=fra`);
            const Message = yield proto_managing_1.ProtoManaging.loadProtoFileAsync(`${__dirname}/protos/web_homeV3.proto`, "mangaplus.Web_homeV3");
            const jsonRes = proto_managing_1.ProtoManaging.decodeToJson(Message, res);
            const chapters = [];
            try {
                for (let s of jsonRes.parent.data.sections) {
                    chapters.push(...s.cards.map((c) => {
                        return {
                            number: text_format_utils_1.TextFormatUtils.formatChapterNumber(array_utils_1.ArrayUtils.tryingSplitAndGet(c.chapter.chapter, "#", 1)),
                            id: c.chapter.id.toString(),
                            image: c.chapter.manga.portraitThumbnail,
                            title: c.chapter.title,
                            manga: {
                                title: c.mangaTitle,
                                id: c.chapter.manga.id.toString(),
                            },
                        };
                    }));
                }
            }
            catch (error) {
                console.error(error);
                throw new ScraperParsingError_1.default("json recieved from manga plus api not have the expected format");
            }
            return chapters;
        });
    }
    getMangas({ q }) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Function not implemented.");
        });
    }
    getManga(name) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Function not implemented.");
        });
    }
}
exports.default = new MangaPlusScraper();
