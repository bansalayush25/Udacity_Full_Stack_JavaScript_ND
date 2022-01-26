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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const process_1 = __importDefault(require("../utilities/process"));
const path = require('path');
const fs = require('fs');
const imageInputDir = '/images/full/';
const imageOutputDir = '/images/thumb/';
const baseImagePath = path.resolve(__dirname + '/../../');
const filename = 'fjord';
const width = 500;
const height = 200;
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('Gets the main endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('Gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
    it('Gets the images endpoint with no image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(400);
    }));
    it('Gets the images endpoint with image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord');
        expect(response.status).toBe(400);
    }));
});
describe('Errors', () => {
    it('Should throw Empty filename error', () => {
        const promise = (0, process_1.default)(undefined, 0, 0);
        promise.catch((err) => {
            expect(err).toEqual('Empty Filename');
        });
    });
    it('Should throw No image exists error', () => {
        const promise = (0, process_1.default)('', 0, 0);
        promise.catch((err) => {
            expect(err).toEqual('No such image exists');
        });
    });
    it('Should throw invalid parameter error with 0 height', () => {
        const promise = (0, process_1.default)(filename, width, 0);
        promise.catch((err) => {
            expect(err).toEqual('Invalid height or width');
        });
    });
    it('Should throw invalid parameter error with undefined width', () => {
        const promise = (0, process_1.default)(filename, undefined, height);
        promise.catch((err) => {
            expect(err).toEqual('Invalid height or width');
        });
    });
    const inputLoc = `${baseImagePath}${imageInputDir}${filename}.jpg`;
    it('Should throw NaN error', () => {
        const promise = (0, process_1.default)(filename, undefined, undefined);
        promise.catch((err) => {
            expect(err).toEqual('Width or height is missing or not a number');
        });
    });
});
describe('Output file', () => {
    const outputLoc = `${baseImagePath}${imageOutputDir}${filename}_thumb-${width}x${height}.jpg`;
    const promise = (0, process_1.default)(filename, width, height);
    it('Should show resized output file', () => {
        promise.then((output) => {
            expect(output).toEqual(outputLoc);
        });
    });
    it('Should show existing output file', () => {
        promise.then((output) => {
            expect(fs.existsSync(outputLoc)).toBeTrue();
        });
    });
});
