"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1["default"].config();
var token_secret = process.env.TOKEN_SECRET;
var verifyToken = function (req, res, next) {
    try {
        // const authorizationHeader = req.headers.authorization || ''
        var token = req.headers.authorization;
        jsonwebtoken_1["default"].verify(token, token_secret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports["default"] = verifyToken;
