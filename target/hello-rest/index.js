"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloRestHandler_1 = require("./HelloRestHandler");
const defaultExtractor_1 = require("./defaultExtractor");
const helloRestHandler = new HelloRestHandler_1.default(defaultExtractor_1.default);
const handler = (event, context, callback) => helloRestHandler.process(event, context, callback);
exports.handler = handler;
