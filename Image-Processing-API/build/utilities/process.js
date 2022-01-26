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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const imageInputDir = '/images/full/';
const imageOutputDir = '/images/thumb/';
function resize(inputLoc, outputLoc, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sharp(inputLoc).resize(width, height).toFile(outputLoc);
            return outputLoc;
        }
        catch (err) {
            throw 'Error while resizing';
        }
    });
}
function processParameters(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseImagePath = path.resolve(__dirname + '/../../');
        const inputLoc = `${baseImagePath}${imageInputDir}${filename}.jpg`;
        const outLoc = `${baseImagePath}${imageOutputDir}${filename}_thumb-${width}x${height}.jpg`;
        if (fs.existsSync(outLoc)) {
            return outLoc;
        }
        else if (!fs.existsSync(inputLoc)) {
            var error;
            if (filename == undefined)
                error = 'Empty Filename';
            else
                error = 'No such image exists';
            throw error;
        }
        else if (isNaN(height) || isNaN(height)) {
            throw 'Width or height is missing or not a number';
        }
        else if (height <= 0 || width <= 0) {
            throw 'Invalid height or width';
        }
        else {
            return resize(inputLoc, outLoc, width, height);
        }
    });
}
exports.default = processParameters;
