import express from 'express';
import { Server } from 'http';
import {
  createExpressServer,
  RoutingControllersOptions,
} from 'routing-controllers';
import { logger } from './utils/logger';
import { PORT } from './utils/config';

export class AppServer {
  private app: express.Application;
  private server: Server;
  private routeOptions: RoutingControllersOptions;

  constructor() {
    this.routeOptions = {
      routePrefix: '/api',
      // defaultErrorHandler: false,
      cors: {
        origin: '*',
        allowedHeaders: '*',
        exposedHeaders: '*',
      },
      controllers: [`${__dirname}/modules/**/*.{ts,js}`],
      interceptors: [`${__dirname}/interceptors/**/*.{ts,js}`],
      middlewares: [`${__dirname}/middlewares/**/*.{ts,js}`],
    };

    // Create server
    this.app = createExpressServer(this.routeOptions);
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
