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
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const Database_1 = require("./libs/Database");
const notFoundRoute_1 = require("./libs/notFoundRoute");
const errorHandler_1 = require("./libs/errorHandler");
// import { createServer } from '';
const childProcess = require("child_process");
const redis = require("redis");
const util_1 = require("util");
class Server {
    constructor(config) {
        this.config = config;
        this.bootStrap = () => {
            this.initBodyParse();
            this.setUpRootRoutes();
            this.fileStream();
        };
        this.fileStream = () => __awaiter(this, void 0, void 0, function* () {
            // console.log({ __dirname });
            // // tslint:disable-next-line: no-empty
            // const data = fs.createReadStream(__dirname + '/someData.txt', { encoding: 'utf8' });
            // const write = fs.createWriteStream(__dirname + '/data2.text');
            // data.pipe(write);
        });
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
        this.longComputation = () => {
            let sum = 0;
            for (let i = 0; i < 1e9; i++) {
                sum = sum + i;
            }
            return sum;
        };
        this.getAsyncCallForRedis = () => {
            const { redisServer } = this;
            return {
                getAsync: util_1.promisify(redisServer.get).bind(redisServer),
                setAsync: util_1.promisify(redisServer.set).bind(redisServer)
            };
        };
        this.setUpRootRoutes = () => {
            const { app, redisServer } = this;
            // app.use(compression());
            app.get('/health-check', (request, response) => __awaiter(this, void 0, void 0, function* () {
                const { getAsync, setAsync } = this.getAsyncCallForRedis();
                const reply = yield getAsync('sums1');
                if (reply) {
                    response.send({
                        sum: JSON.parse(reply)
                    });
                }
                else {
                    const child = childProcess.fork('./src/fork.ts');
                    child.send('start');
                    child.on('message', (sum) => __awaiter(this, void 0, void 0, function* () {
                        const saveResponse = yield setAsync('sums1', JSON.stringify(sum), 'EX', 5000);
                        const str = `weeerererr`;
                        response.send({
                            sum,
                            str: str.repeat(100000)
                        });
                    }));
                }
            }));
            app.get('/sum', (request, response) => {
                const sum = this.longComputation();
                console.time();
                const sum2 = '----------checkThisWay----------';
                response.send({
                    sum,
                    sum2: sum2.repeat(100000),
                });
            });
            app.use('/api', routes_1.rootRouting);
            app.use(notFoundRoute_1.notFoundRoute);
            app.use(errorHandler_1.errorHandler);
        };
        this.app = express();
        this.dataBase = new Database_1.DataBase();
        this.redisServer = redis.createClient();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map