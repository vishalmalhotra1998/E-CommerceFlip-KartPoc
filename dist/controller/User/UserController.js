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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../../repositories");
class UserController {
    constructor() {
        this.userRepository = new repositories_1.UserRepository();
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rest = __rest(req.body, []);
                const createdUser = yield this.userRepository.create(rest);
                res.send({
                    data: createdUser,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
UserController.getInstance = () => {
    if (!UserController.instance) {
        return UserController.instance = new UserController();
    }
    return UserController.instance;
};
exports.default = UserController.getInstance();
//# sourceMappingURL=UserController.js.map