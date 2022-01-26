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
const fs_1 = require("fs");
const process_1 = __importDefault(require("./process"));
const middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.query;
    const filename = query['filename'];
    const width = parseInt(query['width']);
    const height = parseInt(query['height']);
    (0, process_1.default)(filename, width, height)
        .then((outputLoc) => {
        fs_1.promises.readFile(outputLoc).then((data) => {
            res.write(data);
            res.end();
            next();
        });
    })
        .catch((err) => {
        res.writeHead(400, { 'Content-type': 'text/html' });
        res.write(err);
        res.end();
        next();
    });
});
exports.default = middleware;
