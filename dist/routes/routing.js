"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controller/User");
const mainRoute = express_1.Router();
mainRoute.use('/user', User_1.userRouterHandler);
exports.default = mainRoute;
//# sourceMappingURL=routing.js.map