"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseLambdaHandler_1 = require("../commons/BaseLambdaHandler");
class HelloRestHandler extends BaseLambdaHandler_1.BaseLambdaHandler {
    isWarmUp(event) {
        return event.source === 'serverless-plugin-warmup';
    }
    handleWarmUp(callback) {
        callback(null, 'Lambda is warm!');
    }
    checkAndExtractEvent(event) {
        if (!event.language) {
            return {
                satisfied: false,
                message: 'language field가 존재하지 않습니다.',
            };
        }
        return {
            satisfied: true,
            data: {
                message: event.language,
            },
        };
    }
    handleInvalidParameterError(callback, message, data) {
        callback(null, {
            code: 400,
            msg: message || 'Bad Request',
        });
    }
    handle(data) {
        return {
            code: 200,
            data: {
                message: `Hello ${data.message} world!`,
            },
        };
    }
}
exports.default = HelloRestHandler;
