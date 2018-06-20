"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseLambdaProxyHandler_1 = require("../commons/BaseLambdaProxyHandler");
class HelloRestHandler extends BaseLambdaProxyHandler_1.BaseLambdaProxyHandler {
    constructor(extractor) {
        super();
        this.extractor = extractor;
        this.setDefaultHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }
    isWarmUp(event) {
        return event.source === 'serverless-plugin-warmup';
    }
    handleWarmUp(callback) {
        callback(null, 'Lambda is warm!');
    }
    checkAndExtractEvent(event) {
        return this.extractor(event);
    }
    handle(data) {
        return new BaseLambdaProxyHandler_1.LambdaProxyResponse(200, Object.assign({}, this.getDefaultHeaders()), { message: 'Hello REST!' });
    }
}
exports.default = HelloRestHandler;
