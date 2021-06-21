import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import { AppServer } from './server';
import cluster from 'cluster';
import os from 'os';
import { logger } from './utils/logger';
import { DISABLE_CLUSTER } from './utils/config';
import { ElasticSearch } from './elastic-search';

const startServer = () => {
  const appServer = new AppServer();
  appServer.setupStatusRoute();
  appServer.startServer();

  try {
    const es = new ElasticSearch();
    es.createIndex();
    logger.info('Successfully connected to elastic search');
  } catch (error) {
    logger.info(`Failed while connecting to elastic search: ${error}`);
  }
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
