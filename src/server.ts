import express from 'express';
import { Server } from 'http';
import {
  RoutingControllersOptions,
  useContainer,
  useExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import expressHttpContext from 'express-http-context';
import { logger } from './utils/logger';
import { PORT } from './utils/config';

export class AppServer {
  private app: express.Application;
  private server: Server;
  private routeOptions: RoutingControllersOptions;

  constructor() {
    this.app = express();
    this.app.use(expressHttpContext.middleware);
    useContainer(Container);

    this.routeOptions = {
      routePrefix: '/api/v1',
      defaultErrorHandler: false,
      cors: {
        origin: '*',
        allowedHeaders: '*',
        exposedHeaders: '*',
      },
      controllers: [`${__dirname}/modules/**/*.{ts,js}`],
      middlewares: [`${__dirname}/middlewares/**/*.{ts,js}`],
    };
    this.app = useExpressServer(this.app, this.routeOptions);
  }

  getApp() {
    return this.app;
  }

  getServer() {
    return this.server;
  }

  setupStatusRoute() {
    this.app.get('/', (_, res) => res.send('Server running'));
  }

  startServer() {
    this.server = this.app.listen(PORT, () => {
      logger.info(`Server started at port: ${PORT}`);
    });
  }
}
