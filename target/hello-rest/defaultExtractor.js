"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultExtractor = (event) => {
    const contentType = event.headers['Content-Type'] || event.headers['content-type'];
    if (!contentType || contentType !== 'application/json') {
        return {
            satisfied: false,
            message: 'Content-Type이 들어오지 않거나 받을 수 없는 형식입니다',
        };
    }
    const sourceIP = event.requestContext.identity.sourceIp || 'Unknown';
    const userAgent = event.requestContext.identity.userAgent || 'Unknown';
    return {
        satisfied: true,
        data: {
            sourceIP,
            userAgent,
        },
    };
};
exports.default = defaultExtractor;
