"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./utilities/middleware"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Image Processing API</h1>');
});
app.get('/api', (req, res) => {
    res.send('Welcome to API Route. Please visit <i>/api/images</i> route');
});
app.get('/api/images', middleware_1.default, (req, res) => { });
app.listen(port, () => { });
exports.default = app;
