"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloWorldHandler_1 = require("./HelloWorldHandler");
const helloWorldHandler = new HelloWorldHandler_1.default();
const handler = (event, context, callback) => helloWorldHandler.process(event, context, callback);
exports.handler = handler;
