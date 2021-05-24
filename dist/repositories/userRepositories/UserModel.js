"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = void 0;
const mongoose = require("mongoose");
const UserSchema_1 = require("./UserSchema");
exports.userSchema = new UserSchema_1.default({
    collection: 'userDetails'
});
exports.userModel = mongoose.model('userDetails', exports.userSchema, 'User', true);
//# sourceMappingURL=UserModel.js.map