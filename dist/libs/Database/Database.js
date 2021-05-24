"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DataBase {
    constructor() {
        this.open = (mongoUrl) => new Promise((resolve, reject) => {
            mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        this.close = () => {
            mongoose.connection.close();
        };
    }
}
exports.default = DataBase;
//# sourceMappingURL=Database.js.map