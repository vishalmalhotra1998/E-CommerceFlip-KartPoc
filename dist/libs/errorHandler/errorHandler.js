"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorHandler = (error, req, res, next) => {
    if (Array.isArray(error)) {
        res.send({
            error: error[0].message,
            message: error[0].message,
            status: error[0].code,
            timestamp: new Date()
        });
    }
    else {
        res.send({
            error: error.message,
            message: error.message,
            status: error.code,
            timestamp: new Date()
        });
    }
};
//# sourceMappingURL=errorHandler.js.map