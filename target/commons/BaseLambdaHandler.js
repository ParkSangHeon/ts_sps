"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseLambdaHandler {
    setCallbackWaitsForEmptyEventLoop(flag) {
        this.callbackWaitsForEmptyEventLoop = flag;
    }
    process(event, context, callback) {
        if (!this.callbackWaitsForEmptyEventLoop) {
            context.callbackWaitsForEmptyEventLoop = this.callbackWaitsForEmptyEventLoop;
        }
        if (this.isWarmUp(event)) {
            this.handleWarmUp(callback);
            return;
        }
        const result = this.checkAndExtractEvent(event);
        if (!result.satisfied) {
            this.handleInvalidParameterError(callback, result.message, result.data);
            return;
        }
        const ret = this.handle(result.data);
        if (ret instanceof Promise) {
            ret.then((response) => {
                callback(null, response);
            });
        }
        else {
            callback(null, ret);
        }
    }
}
exports.BaseLambdaHandler = BaseLambdaHandler;
