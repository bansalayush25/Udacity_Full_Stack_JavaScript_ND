"use strict";
exports.__esModule = true;
exports.ordersClient = exports.productsClient = exports.usersClient = void 0;
var pg_1 = require("pg");
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_USERS_DB = _a.POSTGRES_USERS_DB, POSTGRES_PRODUCTS_DB = _a.POSTGRES_PRODUCTS_DB, POSTGRES_ORDERS_DB = _a.POSTGRES_ORDERS_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD;
var usersClient = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_USERS_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports.usersClient = usersClient;
var productsClient = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_PRODUCTS_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports.productsClient = productsClient;
var ordersClient = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_ORDERS_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports.ordersClient = ordersClient;
