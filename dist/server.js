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
const http_1 = __importDefault(require("http"));
const db_connect_1 = __importDefault(require("../src/app/config/dbConnect/db.connect"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
const port = process.env.PORT || 5000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connect_1.default)();
        server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Db Running  ${port}`);
        }));
    }
    catch (e) {
        console.log("Database Error");
        console.log(e);
    }
});
main();
process.on("unhandledRejection", () => {
    console.log(`😢😢😢😢😢😢😢😢😢😢 unhandledRejection   ... shutdown now`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", () => {
    console.log(`😢😢😢😢😢😢😢😢😢😢 UncaughtException ... shutdown now`);
    process.exit(1);
});
