"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserModel_1 = require("./UserModel");
class UserRepository {
    constructor() {
        this.generateObjectId = () => {
            return String(mongoose.Types.ObjectId());
        };
        this.create = (options) => __awaiter(this, void 0, void 0, function* () {
            const createdData = yield this.userModel.create(Object.assign(Object.assign({}, options), { _id: this.generateObjectId() }));
            return createdData;
        });
        this.userModel = UserModel_1.userModel;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map