"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const Server_1 = require("./Server");
const server = new Server_1.default(config_1.configuration);
server.bootStrap();
server.run();
//# sourceMappingURL=index.js.map