"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./UserController");
const validations_1 = require("./validations");
const validation_1 = require("../../libs/validation");
const routeHandler = express_1.Router();
routeHandler.post('/sign-up', validation_1.validateInputs(validations_1.validation.create), UserController_1.default.signUp);
exports.default = routeHandler;
//# sourceMappingURL=route.js.map