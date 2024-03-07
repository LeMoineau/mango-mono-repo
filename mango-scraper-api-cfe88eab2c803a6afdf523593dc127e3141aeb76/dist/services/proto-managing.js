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
exports.ProtoManaging = void 0;
const axios_1 = __importDefault(require("axios"));
const protobufjs_1 = require("protobufjs");
var ProtoManaging;
(function (ProtoManaging) {
    function loadProtoFileAsync(filename, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield new Promise((resolve, reject) => {
                (0, protobufjs_1.load)(filename, (err, root) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const Message = root === null || root === void 0 ? void 0 : root.lookupType(type);
                    if (!Message) {
                        reject(`proto look up on type ${type} failed!`);
                        return;
                    }
                    resolve(Message);
                });
            }).catch((err) => {
                throw err;
            });
            return res;
        });
    }
    ProtoManaging.loadProtoFileAsync = loadProtoFileAsync;
    function httpGetProtoFile(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default
                .get(url, {
                responseType: "arraybuffer",
            })
                .then((res) => res.data);
        });
    }
    ProtoManaging.httpGetProtoFile = httpGetProtoFile;
    function decodeToJson(type, toDecode) {
        return type.decode(toDecode).toJSON();
    }
    ProtoManaging.decodeToJson = decodeToJson;
})(ProtoManaging || (exports.ProtoManaging = ProtoManaging = {}));
