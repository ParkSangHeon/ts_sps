"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseLambdaHandler_1 = require("./BaseLambdaHandler");
class LambdaProxyEvent {
}
exports.LambdaProxyEvent = LambdaProxyEvent;
class LambdaProxyResponse {
    constructor(statusCode, headers, body, isBase64Encoded = false) {
        this.statusCode = statusCode;
        this.headers = headers;
        if (typeof body === 'string') {
            this.body = body;
        }
        else if (typeof body === 'object') {
            this.body = JSON.stringify(body);
        }
        else {
            this.body = null;
        }
        this.isBase64Encoded = isBase64Encoded;
    }
}
exports.LambdaProxyResponse = LambdaProxyResponse;
class BaseLambdaProxyHandler extends BaseLambdaHandler_1.BaseLambdaHandler {
    setDefaultHeaders(headers) {
        this.defaultHeaders = headers;
    }
    getDefaultHeaders() {
        return this.defaultHeaders;
    }
    handleInvalidParameterError(callback, message) {
        callback(null, new LambdaProxyResponse(400, this.defaultHeaders, null, false));
    }
}
exports.BaseLambdaProxyHandler = BaseLambdaProxyHandler;
