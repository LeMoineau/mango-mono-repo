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
const settings_routes_1 = __importDefault(require("./settings-routes"));
const settings_controller_1 = __importDefault(require("../controllers/settings-controller"));
(0, vitest_1.describe)("chapters-routes", () => {
    const app = (0, express_1.default)();
    (0, vitest_1.beforeAll)(() => {
        app.use("/settings", settings_routes_1.default);
    });
    (0, vitest_1.it)("should call settings controller get config when getting settings", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(settings_controller_1.default, "getConfig");
        yield (0, supertest_1.default)(app).get("/settings");
        (0, vitest_1.expect)(settings_controller_1.default.getConfig).toHaveBeenCalled();
    }));
});
