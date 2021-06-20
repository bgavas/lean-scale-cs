import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import { AppServer } from './server';
import cluster from 'cluster';
import os from 'os';
import { logger } from './utils/logger';
import { DISABLE_CLUSTER } from './utils/config';

const startServer = () => {
  const appServer = new AppServer();
  appServer.setupStatusRoute();
  appServer.startServer();
};

if (DISABLE_CLUSTER || !cluster.isMaster) {
  startServer();
} else {
  // cluster package already works in round-robin
  os.cpus().forEach(() => {
    cluster.fork();
  });

  cluster.on('online', (worker) => {
    logger.info(`Worker ${worker.process.pid} started`);
  });

  cluster.on('exit', (worker) => {
    logger.info(`Worker ${worker.process.pid} stopped`);
  });
}
