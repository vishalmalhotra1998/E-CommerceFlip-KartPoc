"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class UserSchema extends mongoose.Schema {
    constructor(data) {
        const userSchema = {
            id: String,
            name: String,
            email: String,
            password: String,
            address: String,
            dob: Date,
            role: String,
            mob: Number,
        };
        super(userSchema, data);
    }
}
exports.default = UserSchema;
//# sourceMappingURL=UserSchema.js.map