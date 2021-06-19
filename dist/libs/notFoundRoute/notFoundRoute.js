"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRoute = void 0;
exports.notFoundRoute = (req, res, next) => {
    console.log('::::::::Inside Not FoundRoute::::::');
    next({ message: 'Not Found', code: 500 });
};
//# sourceMappingURL=notFoundRoute.js.map