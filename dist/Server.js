"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const Database_1 = require("./libs/Database");
const notFoundRoute_1 = require("./libs/notFoundRoute");
const errorHandler_1 = require("./libs/errorHandler");
class Server {
    constructor(config) {
        this.config = config;
        this.bootStrap = () => {
            this.initBodyParse();
            this.setUpRootRoutes();
        };
        this.initBodyParse = () => {
            const { app } = this;
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
        };
        this.run = () => {
            const { app, config: { PORT: port, MONGO_URL: mongoUrl }, dataBase } = this;
            dataBase.open(mongoUrl).then(() => {
                app.listen(port, () => {
                    console.log(':::::::::::Runnig Port::::::::', port);
                });
            });
        };
        this.setUpRootRoutes = () => {
            const { app } = this;
            app.get('/health-check', (request, response) => {
                response.send('I am Robot');
            });
            app.use('/api', routes_1.rootRouting);
            app.use(notFoundRoute_1.notFoundRoute);
            app.use(errorHandler_1.errorHandler);
        };
        this.app = express();
        this.dataBase = new Database_1.DataBase();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map