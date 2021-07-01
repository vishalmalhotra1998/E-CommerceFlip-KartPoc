import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { rootRouting } from './routes';
import { DataBase } from './libs/Database';
import { notFoundRoute } from './libs/notFoundRoute';
import { errorHandler } from './libs/errorHandler';
// import { createServer } from '';
import * as childProcess from 'child_process';
import * as redis from 'redis';
import { promisify } from 'util';
import * as fs from 'fs';
import * as compression  from 'compression';
class Server {
  private app: express.Express;
  private dataBase: DataBase;
  private redisServer: any;
  constructor(private config: any) {
    this.app = express();
    this.dataBase = new DataBase();
    this.redisServer = redis.createClient();
  }
  bootStrap = (): void => {
    this.initBodyParse();
    this.setUpRootRoutes();
    this.fileStream();
  }

  fileStream = async () => {
    // console.log({ __dirname });
    // // tslint:disable-next-line: no-empty
    // const data = fs.createReadStream(__dirname + '/someData.txt', { encoding: 'utf8' });
    // const write = fs.createWriteStream(__dirname + '/data2.text');
    // data.pipe(write);
  }
  initBodyParse = () => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }
  run = (): void => {
    const { app, config: { PORT: port, MONGO_URL: mongoUrl }, dataBase } = this;
    dataBase.open(mongoUrl).then(() => {
      app.listen(port, () => {
        console.log(':::::::::::Runnig Port::::::::', port);
      });
    });

  }


  longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum = sum + i;
    }
    return sum;
  }

  getAsyncCallForRedis = () => {
    const { redisServer } = this;
    return {
      getAsync: promisify(redisServer.get).bind(redisServer),
      setAsync: promisify(redisServer.set).bind(redisServer)
    };
  }
  setUpRootRoutes = (): void => {
    const { app, redisServer } = this;
    // app.use(compression());
    app.get('/health-check', async (request: Request, response: Response) => {
      const { getAsync, setAsync } = this.getAsyncCallForRedis();
      const reply = await getAsync('sums1');
      if (reply) {
        response.send({
          sum: JSON.parse(reply)
        });
      } else {
        const child = childProcess.fork('./src/fork.ts');
        child.send('start');
        child.on('message', async (sum: any) => {
          const saveResponse = await setAsync('sums1', JSON.stringify(sum), 'EX', 5000);
          const str = `weeerererr`;
          response.send({
            sum,
            str: str.repeat(100000)
          });
        });
      }
    });
    app.get('/sum', (request: Request, response: Response) => {
      const sum = this.longComputation();
      console.time();
      const sum2 = '----------checkThisWay----------'
      response.send({
        sum,
        sum2: sum2.repeat(100000),
      });
    });
    app.use('/api', rootRouting);
    app.use(notFoundRoute);
    app.use(errorHandler);
  }
}
export default Server;
